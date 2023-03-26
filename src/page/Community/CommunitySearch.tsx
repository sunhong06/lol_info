import React,{useEffect, useState} from 'react'
import '../../scss/Community/CommunitySearch.scss'
import {FaSearch} from 'react-icons/fa';
import { useNavigate,createSearchParams } from 'react-router-dom';
import { db } from '../../fbase' 
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function CommunitySearch({boardList}:any) {
  const [search,setSearch] = useState("");
  const [searchBoard,setSearchBoard] = useState([]);
  const navigate = useNavigate();

  const headleChangeSearch = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    const value = e.target.value
    boardList.map((board:any)=>{
      if(value === "all"){
        return board
      } else if(value === "title"){
        console.log(board.title)
      }else if(value === "writer"){
        console.log(board.title)
      }else if(value === "contents"){
        console.log(board.detail)
      }
    })
  }
  const handleSubmitSearch = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(search){
      const BoardRef = collection(db, "Board");
      const querySnapshot = await getDocs(query(BoardRef, orderBy("createAt", "desc")));
      const newArray:any = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      setSearchBoard(newArray)

    }
    if(search == ""){
      alert("검색어를 입력해주세요")
    }
    navigate({
      search: `?${createSearchParams({search: search})}`,
    }); 
    setSearch("")
  }
  console.log(searchBoard)
  return (
    <form className='cmnt_form' onSubmit={handleSubmitSearch}>
    <fieldset>
      <legend className='blind'>커뮤니티 검색창</legend>
      <div className='cmnt_input'>
        <select onChange={headleChangeSearch}>
          <option value="all">전체</option>
          <option value="title">제목</option>
          <option value="writer">작성자</option>
          <option value="contents">내용</option>
        </select>
        <input type="search" value={search}  placeholder='검색어를 입력하세요' onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setSearch(e.target.value)} className='cmnt_search' title='검색' />
        <button type='submit'><FaSearch /></button>
      </div>
    </fieldset>
  </form>
  )
}

export default CommunitySearch;
