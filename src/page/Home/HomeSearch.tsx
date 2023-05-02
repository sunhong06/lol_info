import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';

function HomeSearch() {
const [search,setSearch] = useState<string>("");
const navigate = useNavigate();



const onSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setSearch(value)
}

const searchForSummoner = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(search != ""){
        navigate(`/SummonerInfo/${search}`,{state:search})
    }
      }


  return (
    <form className='home_form' onSubmit={searchForSummoner} >
      <fieldset>
      <legend className='blind'>소환사 검색창</legend>
      <input type="search" value={search} onChange={onSearch} className='summoner_search' placeholder='소환사명을 입력하세요'  title='검색' autoFocus />
      <button type="submit"><FaSearch /></button>
      </fieldset>
    </form>
  )
}

export default HomeSearch
