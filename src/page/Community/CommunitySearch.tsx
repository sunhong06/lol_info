import React,{useEffect, useState} from 'react'
import '../../scss/Community/CommunitySearch.scss'
import { db } from '../../fbase' 
import { collection, query, where,getDocs } from "firebase/firestore";
import {FaSearch} from 'react-icons/fa';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { summoner } from '../../store/store';

function CommunitySearch({boardList}:any) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [select,setSelect] = useState<string>("title");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedResultSeletor = useSelector((state:any)=> state.summonerData.communitySearchArray); 
  

  const headleChangeSelect = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    const value = e.target.value
    // 카테고리 선택
    boardList.map((board:any)=>{
     if(value === "title"){
       setSelect("title") 
       console.log(board.title)
     }else if(value === "writer"){
       setSelect("id")
     }else if(value === "contents"){
       setSelect("detail")
     }
    })
  }

  const headleChangeSearch = (e:React.ChangeEvent<HTMLInputElement>)=> {
    setSearchTerm(e.target.value)
  }

  const handleSubmitSearch = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchTerm == ""){
      alert("검색어를 입력해주세요");
    } else{
      // 검색
      const BoardRef = collection(db, "Board");
      const q = query(BoardRef, where(select, ">=", searchTerm), where(select, "<=" ,searchTerm + "\uf8ff"))
      const querySnapshot =  await getDocs(q);
      querySnapshot.forEach((doc)=>{
          dispatch({type:"summonerDataReducer/CommunitySearched", payload:{ id: doc.id, ...doc.data() }})
      });
        navigate({
          search: `?q=${createSearchParams({search: searchTerm})}`,
        });
        if(searchedResultSeletor.length > 0){
          // 이전 검색값 삭제후 다시호출
        dispatch({type:"summonerDataReducer/CommunityClearSearched"});
        querySnapshot.forEach((doc)=>{
          dispatch({type:"summonerDataReducer/CommunitySearched", payload:{ id: doc.id, ...doc.data() }})
      })
}
      setSearchTerm("");
    }
  };



  return (
    <form className='cmnt_form' onSubmit={handleSubmitSearch}>
    <fieldset>
      <legend className='blind'>커뮤니티 검색창</legend>
      <div className='cmnt_input'>
        <select onChange={headleChangeSelect}>
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option value="contents">내용</option>
        </select>
        <input type="search" value={searchTerm}  placeholder='검색어를 입력하세요' onChange={headleChangeSearch} className='cmnt_search' title='검색' />
        <button type='submit'><FaSearch /></button>
      </div>
    </fieldset>
  </form>
  )
}

export default CommunitySearch;
