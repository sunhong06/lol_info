import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { AuthService } from "../../fbase/fbase";
import "../../scss/SignUp.scss";
import "../../scss/button/button.scss";
import { Link, useNavigate } from "react-router-dom";
import Input from "../input/Input";
import Button from "../button/Button";

function SignUpForm() {
  const [userData, setUserData] = useState({
    nickName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const [IsVirtfy, setIsVirtfy] = useState({
    isPwd: false,
    isEmail: false,
    isName: false,
  });

  const { nickName, email, password, passwordCheck } = userData;
  const navigate = useNavigate();

  // 입력값 바뀔 때마다 저장하기
  const handleInput = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const hadleInputPwd = (e: any) => {
    setUserData({
      ...userData,
      password: e.target.value,
    });
    const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    if (!reg.test(userData.password)) {
      setErrors({
        ...errors,
        passwordError: "4-12사이 대소문자 또는 숫자만 입력해 주세요!",
      });
      setIsVirtfy({
        ...IsVirtfy,
        isPwd: false,
      });
    } else {
      setIsVirtfy({
        ...IsVirtfy,
        isPwd: true,
      });
    }
  };

  const isCheck = password === passwordCheck;
  const isValid =
    email !== "" && isCheck === true && nickName !== "" && password !== "";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        AuthService,
        email,
        password
      );
      const userInfo = AuthService.currentUser;
      if (userInfo !== null) {
        await updateProfile(userInfo, {
          displayName: nickName,
        });
      } else {
        return;
      }

      alert("회원가입이 완료되었습니다.");
      navigate("/");
      return user;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrors({ emailError: "이미가입된회원입니다.", passwordError: "" });
        } else if (error.message === "Firebase: Error (auth/invalid-email).") {
          setErrors({
            emailError: "이메일형식이여야합니다.",
            passwordError: "",
          });
        } else if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setErrors({
            emailError: "",
            passwordError: "4-12사이 대소문자 또는 숫자만 입력해 주세요!",
          });
          setIsVirtfy({
            ...IsVirtfy,
            isPwd: true,
          });
        }
      }
    }
  };

  return (
    <main className="signUp_main">
      <h1 onClick={() => navigate("/")}>
        <img src={process.env.PUBLIC_URL + "/imgs/lol_logo.png"} />
        LOL.info
      </h1>
      <form onSubmit={onSubmit} className="signUp_form">
        <fieldset>
          <legend className="blind">회원가입창</legend>
          <Input
            type="text"
            name="nickName"
            value={userData.nickName}
            placeholder="닉네임"
            onChange={handleInput}
            required
          />
          <Input
            type="email"
            name="email"
            value={userData.email}
            placeholder="이메일"
            onChange={handleInput}
            required
          />
          <Input
            type="password"
            name="password"
            value={userData.password}
            placeholder="비밀번호"
            onChange={hadleInputPwd}
            required
          />
          <Input
            type="password"
            name="passwordCheck"
            value={userData.passwordCheck}
            placeholder="비밀번호 확인"
            onChange={handleInput}
            required
          />
          {passwordCheck !== "" && isCheck === false && (
            <p className="pwdError">비밀번호를 확인해주세요.</p>
          )}
          <div className="login">
            <Link to="/login">로그인</Link>
          </div>
          <Button
            className={isValid ? "signBtn" : "disabled"}
            disabled={isValid === false && IsVirtfy.isPwd}
            type="submit"
          >
            회원가입
          </Button>
          <span className="authError">
            {errors.passwordError !== "" &&
              IsVirtfy.isPwd &&
              errors.passwordError}
            {errors.emailError !== "" && errors.emailError}
          </span>
        </fieldset>
      </form>
    </main>
  );
}

export default SignUpForm;
