import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { AuthService } from "../../fbase/fbase";
import { FaGithub, FaGoogle, FaFacebook } from "react-icons/fa";
import "../../scss/Login.scss";
import { useNavigate, Link } from "react-router-dom";
import Input from "../input/Input";
import Button from "../button/Button";
import "../../scss/button/button.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e: any) => {
    const {
      target: { value, name },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await signInWithEmailAndPassword(AuthService, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage == "Firebase: Error (auth/invalid-email).") {
          setError("이메일형식이어야 합니다.");
        } else if (errorMessage == "Firebase: Error (auth/user-not-found).") {
          setError("아이디,비밀번호를 확인해주세요.");
        }
      });
  };

  const onClick = async (e: any) => {
    const name = e.target.name;
    let provider: any;
    if (name == "Google") {
      provider = new GoogleAuthProvider();
    } else if (name == "GitHub") {
      provider = new GithubAuthProvider();
    } else if (name == "Facebook") {
      provider = new FacebookAuthProvider();
    }
    await signInWithPopup(AuthService, provider);
    navigate("/");
  };

  return (
    <main className="auth_main">
      <h1 onClick={() => navigate("/")}>
        <img src={process.env.PUBLIC_URL + "/imgs/lol_logo.png"} />
        LOL.info
      </h1>
      <form onSubmit={onSubmit} className="auth_form">
        <fieldset>
          <legend className="blind">로그인창</legend>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="아이디를 입력하세요"
            onChange={onChange}
            required
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={onChange}
            required
          />
          <Button type="submit" className="signBtn">
            로그인
          </Button>
          <span className="authError">{error}</span>
        </fieldset>
      </form>
      <div className="signUp">
        <Link to="/SignUp">회원가입</Link>
      </div>
      <div className="brand_btn">
        <Button className="signBtn" onClick={onClick} name="GitHub">
          <FaGithub />
          GitHub로 로그인
        </Button>
        <Button className="signBtn" onClick={onClick} name="Google">
          <FaGoogle />
          Google로 로그인
        </Button>
        <Button className="signBtn" onClick={onClick} name="Facebook">
          <FaFacebook />
          Facebook로 로그인
        </Button>
      </div>
    </main>
  );
}

export default Login;
