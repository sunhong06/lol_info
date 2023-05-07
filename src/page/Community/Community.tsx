import React, {useEffect, useState} from 'react'
import '../../scss/Community/community.scss';
import { Link } from 'react-router-dom';
import Category from './Category';
import CommunitySearch from './CommunitySearch';
import CommunityBoard from './CommunityBoard';
import { db } from '../../fbase' 
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import CommunityPage from './CommunityPage';
import { useSelector } from 'react-redux';
import Login from '../../components/Login';
import { boards } from '../../type/type';

const Community = ({userObj}:any) => {
  const [boardList,setBoardList] = useState([]);
  const [select,setSelect] = useState();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const communitySearchSeletor = useSelector((state:any)=> state.summonerData.communitySearchArray);
  


  // 페이지네이션을 위해 slice를 이용해 배열을 나눔
    const BoardResult = boardList.slice(indexOfFirstItem, indexOfLastItem);
   // 검색결과값
    const searchResult = communitySearchSeletor.slice(indexOfFirstItem, indexOfLastItem);
     
// firebase를 통해 db에 게시글저장
    const Bring = async() =>{
    const BoardRef = collection(db, "Board");
    const querySnapshot = await getDocs(query(BoardRef, orderBy("createAt", "desc")));
    const newArray:any = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id});
    });
    setBoardList(newArray)
  }

  
  // 카테고리에 맞게 게시글이 나눔
   const catagorys = (name: React.SetStateAction<undefined>)=>{
    setSelect(name)
   }

  useEffect(()=>{
    Bring();
    
  },[communitySearchSeletor])

  return (
      <>
      {userObj ?
      <>
       <main className='cmnt_main'>
         <Category catagorys={catagorys} /> 
         <h2 className='cmnt_title'>커뮤니티</h2>
         <div className='cmnt_box'>
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
       {communitySearchSeletor.length == 0 ?
       BoardResult.filter((board:boards)=>{
       if(undefined == select){
         return board
       } else
       if(board.option === select){
         return board
       } else if(select === "전체"){
         return board
       }})
       .map((board:boards,idx:number)=>(
           <CommunityBoard
           name={board.user}
           key={board.id}
           num={idx+1}
           board={board}
         />))
         :
         searchResult.filter((board:boards)=>{
           if(undefined == select){
             return board
           } else
           if(board.option === select){
             return board
           } else if(select === "전체"){
             return board
           } })
           .map((board:boards,idx:number)=>(
               <CommunityBoard
               name={board.user}
               key={board.id}
               num={idx+1}
               board={board}
           />))}   
     </tbody>
   </table>
         <button className='Writing_btn'><Link to="/Writing"  className='writing'>글작성</Link></button>
         <CommunityPage  setCurrentPage={setCurrentPage} result={BoardResult} searchResult={searchResult} currentPage={currentPage} itemsPerPage={itemsPerPage} boardList={boardList}   />
         <CommunitySearch boardList={boardList} />
       </div>
     </main>
     </>
     :
     
     <Login />
      }
      
      </>
  )
}

export default React.memo(Community);