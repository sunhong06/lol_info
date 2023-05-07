import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../fbase';
import '../scss/SignUp.scss'
import { useNavigate } from 'react-router-dom';
import { async } from '@firebase/util';

function SignUp() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const navigate = useNavigate();


    const onChange = (e:any) =>{
        const {target: {value,name}} = e;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        try{
          await createUserWithEmailAndPassword(AuthService, email, password);
        alert("회원가입이 완료되었습니다.")
        navigate("/");
        }catch(error){
            if (error instanceof Error) {
              if(error.message == "Firebase: Error (auth/email-already-in-use)."){
                  setError("이미가입된회원입니다.");
                 }else if(error.message == "Firebase: Password should be at least 6 characters (auth/weak-password)."){
                    setError("비밀번호가 6자 이상이여야 합니다.");
                }else if(error.message == "Firebase: Error (auth/invalid-email)."){
                  setError("이메일형식이어야 합니다.")
                }
        }
    }
  }
  return (
    <main className='signUp_main'>
        <h1 onClick={()=>navigate("/")}><img src='imgs/lol_logo.png' />LOL.info</h1>
        <form onSubmit={onSubmit} className="signUp_form">
        <fieldset>
            <legend className='blind'>회원가입창</legend>
            <input type="email"   name="email" value={email} placeholder='아이디를 입력하세요' onChange={onChange} required />
            <input type="password"  name="password" value={password} placeholder='비밀번호를 입력하세요' onChange={onChange} required />
            <input type="submit"  value='회원가입' />
            <span className='authError'>{error}</span>
        </fieldset>
    </form>
    </main>
  )
}

export default SignUp;
