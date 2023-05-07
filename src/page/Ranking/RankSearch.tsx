import axios from 'axios';
import React,{useRef, useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import { createSearchParams } from 'react-router-dom';

function RankSearch({dispatch,navigate}:any) {
    
const [search,setSearch] = useState<string>("");

  // 구글 검색API를 이용해서 검색기능구현
  const onHandleSearchClick = async (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    setSearch(e.currentTarget.value)
    if(search.length > 0){
      const res = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${"AIzaSyDbi2BT9z4z4jQ0j0TTHgxzUzlx9QjnE10"}&cx=${"a3220d481370c47da"}&q=${search}`)
      try{
        dispatch({type:"summonerDataReducer/RankSearch", payload:res.data})
      }catch{
        dispatch({type:"summonerDataReducer/RankSearch", payload:null})
      }
    }
    navigate({
      search: `?q=${createSearchParams({search: search})}`,
    });
    setSearch("");
  };


  return(
  <div className='rank_input'>
      <input type="search"  placeholder='소환사 명' value={search} onChange={(e)=>setSearch(e.target.value)} className='rank_search' title='검색' />
      <button type='submit' onClick={onHandleSearchClick}><FaSearch /></button>
  </div>
  )
}

export default RankSearch;
