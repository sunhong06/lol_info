import React, {useState} from 'react';
import Header from '../../components/Header';
import {FaSearch} from 'react-icons/fa';
import '../../scss/Home/Home.scss';
import { useNavigate } from 'react-router-dom';




function Home() {
const [search, setSearch] = useState("");

const navigate = useNavigate();

const onSearch = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setSearch(value);
}

  const searchForSummoner = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(search != ""){
      navigate(`/SummonerInfo/${search}`,{state:search})
      }
    }
  


  return (
    <>
    <Header />
    <main className='home_main'>
      <h1 className='home_title'><img src={process.env.PUBLIC_URL + '/imgs/lol_logo.png'} />LOL.info</h1>
      <form className='home_form' onSubmit={searchForSummoner} >
          <fieldset>
            <legend className='blind'>소환사 검색창</legend>
            <input type="search" value={search} onChange={onSearch} className='summoner_search' placeholder='소환사명을 입력하세요'  title='검색' autoFocus />
           <button type="submit"><FaSearch /></button>
          </fieldset>
      </form>
    </main>
    </>
  )
}


export default (Home);