import React, {useEffect, useState} from 'react'
import Header from '../../components/Header';
import '../../scss/Community/community.scss';
import { Link } from 'react-router-dom';
import Category from './Category';
import CommunitySearch from './CommunitySearch';
import CommunityBoard from './CommunityBoard';
import { db } from '../../fbase' 
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import CommunityPage from './CommunityPage';

const Community = () => {
  const [boardList,setBoardList] = useState([]);
  const [select,setSelect] = useState();
  const [page, setPage] = useState(1); //페이지
const limit = 10; // posts가 보일 최대한의 갯수
const offset = (page-1)*limit; // 시작점과 끝점을 구하는 offset


    const result = boardList.slice(offset, offset + limit);

  const Bring = async() =>{
    const BoardRef = collection(db, "Board");
    const querySnapshot = await getDocs(query(BoardRef, orderBy("createAt", "desc")));
    const newArray:any = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id});
    });
    setBoardList(newArray)
  }
   const catagorys = (name: any)=>{
    setSelect(name)
   }
  useEffect(()=>{
    Bring();
  },[])

  return (
      <>
      <Header />
      <main className='cmnt_main'>
        <>
              <Category  catagorys={catagorys} /> 
        </>
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

      {result.filter((board:any)=>{
        if(undefined == select){
          return board
        } else
        if(board.option === select){
          return board
        } else if(select === "전체"){
          return board
        } 
})
       .map((board:any,idx:number)=>(
           <CommunityBoard
           key={board.id}
            num={idx+1}
            board={board}
       />
            ))}   
    </tbody>
  </table>
        <CommunityPage  limit={limit} page={page} totalBoard={boardList.length} setPage={setPage} />
        <CommunitySearch boardList={boardList} />
      </div>
      </main>
      </>
  )
}

export default Community;