import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../scss/Header.scss';
import { onAuthStateChanged,deleteUser } from "firebase/auth";
import { AuthService } from '../fbase'



function Header() {
  const [topNavi, setTopNavi] = useState(true); 

  const navigate = useNavigate();

  const onLogOutClick = () =>{
    AuthService.signOut();
    navigate("/");
    setTopNavi(prev => !prev);

  }

  onAuthStateChanged(AuthService, (user) => {
    if (user) {
      setTopNavi(prev => !prev);
      const uid = user.uid;
    } 
  });




  return (
    <>
    <header>
    <ul className='tnb'>
      {topNavi ? 
      <>
      <li><Link to="/Login">로그인</Link></li> 
      <li><Link to="/SignUp">회원가입</Link></li>
      </> 
      :
      <>
      <li><button name='logout' onClick={onLogOutClick}>로그아웃</button></li> 
      </> 
    }
    </ul>
    <nav className='gnb'>
      <ul>
          <li className='logo' onClick={()=>window.location.reload()}><Link to='/'><img src='imgs/lol_logo.png' />LoL.info</Link></li>
          <li onClick={()=>window.location.reload()}><Link to='/'>홈</Link></li>
          <li><Link to='/Ranking'>랭킹</Link></li>
          <li><Link to='/Community'>커뮤니티</Link></li>
          <li><Link to='/ChampionInfo'>챔피언정보</Link></li>
      </ul>
    </nav>
    </header>
    </>
  )
}

export default Header;