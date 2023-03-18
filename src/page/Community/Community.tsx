import React, {useEffect, useState} from 'react'
import Header from '../../components/Header';
import '../../scss/Community/community.scss';
import { Link } from 'react-router-dom';
import Category from './Category';
import CommunitySearch from './CommunitySearch';
import CommunityBoard from './CommunityBoard';
import { AuthService } from "../../fbase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../../fbase' 
import { collection, getDocs } from "firebase/firestore";
import CommunityPage from './CommunityPage';
import Login from '../../components/Login';

const Community = () => {
  const [login,setLogin] = useState(false);
  const [userObj, setUserObj] = useState<any>(null);
  const [boardList,setBoardList] = useState([]);
  const Bring = async() =>{
    const querySnapshot = await getDocs(collection(db, "Board"));
    const newArray:any = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id});
    });
    setBoardList(newArray)
  }
  useEffect(()=>{
    onAuthStateChanged(AuthService, (user) => {
      if (user) {
        setLogin(true);
        setUserObj(user);
      } else {
        setLogin(false);
      }
    })
    Bring();
  },[])

  return (
    <>
    {login ? 
      <>
      <Header />
      <main className='cmnt_main'>
        <Category />
        <div className='cmnt_box'>
            <button className='Writing_btn'><Link to="/Writing"  className='writing'>글작성</Link></button>
    <table className='cmnt_table'>
    <caption className='blind'>커뮤니티</caption>
    <colgroup>
      <col className='number' />
      <col className='title' />
      <col className='user' />
      <col className='date' />
      <col className='rmd' />
    </colgroup>
    <thead>
      <tr>
        <th scope='col'>번호</th>
        <th scope='col'>제목</th>
        <th scope='col'>작성자</th>
        <th scope='col'>등록일</th>
        <th scope='col'>추천</th>
      </tr>
    </thead>
    <tbody>
          {boardList.map((board:any,idx:number)=>(
           <CommunityBoard
           nickname={userObj.displayName}
            num={idx+1}
            board={board}
       />
            ))}
    </tbody>
  </table>
        <CommunityPage />
        <CommunitySearch />
      </div>
      </main>
      </>
    : 
    <Login />
    }
    </>
  )
}

export default Community;