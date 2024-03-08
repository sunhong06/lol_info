import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../scss/Header.scss";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthService } from "../../fbase/fbase";
import React from "react";
import Loading from "../loading/Loading";

function Header() {
  const [user, setUser] = useState<User>();

  const uid = localStorage.getItem("uid");
  console.log(uid);
  const onLogOutClick = async () => {
    await AuthService.signOut();
    localStorage.clear();
  };

  useEffect(() => {
    onAuthStateChanged(AuthService, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("uid", user.uid);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  return (
    <>
      <header>
        <nav className="gnb">
          <ul>
            <li className="logo">
              <Link to="/">
                <img src={process.env.PUBLIC_URL + "/imgs/lol_logo.png"} />
              </Link>
            </li>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/Ranking">랭킹</Link>
            </li>
            <li>
              <Link to="/Community">커뮤니티</Link>
            </li>
            <li>
              <Link to="/Champion">챔피언정보</Link>
            </li>
          </ul>
        </nav>
        <ul className="tnb">
          {uid === null ? (
            <>
              <li>
                <Link to="/Login">로그인</Link>
              </li>
              <li>
                <Link to="/SignUp">회원가입</Link>
              </li>
            </>
          ) : (
            <>
              <li>{user?.displayName}님 어서오세요!</li>
              <li>
                <button name="logout" onClick={onLogOutClick}>
                  로그아웃
                </button>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header;
