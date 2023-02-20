import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { FaSearch } from 'react-icons/fa';
import {lolAxios} from '../../axios';
import '../../scss/ranking.scss';
import RankingData from './RankingData';
import Pageing from './Pageing';
import { createSearchParams, useNavigate } from 'react-router-dom';


function Ranking(){
const [Crank,setCRank] = useState([]);
const [GMrank,setGMRank] = useState([]);
const [Mrank,setMRank] = useState([]);
const [search,setSearch] = useState("");
const [searchData,setSearchData] = useState("");
const [page, setPage] = useState<number>(1);
const limit = 100;
const offset = (page-1)*limit;

const postsData = (posts:any) => {
  if(posts){
    const result = posts.slice(offset, offset + limit);
    
    return result;
  }
}

  const navigate = useNavigate()
  
  const getCRankingData = async() => {
    await lolAxios.get(`/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`)
      .then((res:any) => {
        setCRank(res.data.entries)
      }).catch((error:any) => {
        console.log(error);
      })
      setTimeout(getGMRankingData,100)
  }

  const getGMRankingData = async() => {
    await lolAxios.get(`/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5`)
      .then((res:any) => {
        setGMRank(res.data.entries)
      }).catch((error:any) => {
        console.log(error);
      })
      setTimeout(getMRankingData,100)
  }
  
  const getMRankingData = async() => {
    await lolAxios.get(`/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5`)
      .then((res:any) => {
        setMRank(res.data.entries)
      }).catch((error:any) => {
        console.log(error);
      })
  }

  // const getD1RankingData = async() => {
  //   const D1count:any = Array(18).fill("");
  //   await D1count.map(async (_:any,idx:number)=> await lolAxios.get(`/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/I?page=${idx+1}`)
  //   .then((res) => {
  //     setD1Rank(res.data);
  //   }).catch((error:any) => {
  //     console.log(error);
  //   })
  //   )
  // }

  useEffect(()=>{
    getCRankingData();
  },[])

  const totalPosts = Crank.length + GMrank.length + Mrank.length 
  const highRankingData = Crank.concat(GMrank, Mrank);
  const point ="leaguePoints";
  const highRankingDataSort =  highRankingData.sort(((a:any,b:any)=>{
    return   b[point] - a[point] 
}))


const onChangeSearch = (e:any) =>{
  e.preventDefault();
  setSearch(e.target.value.toLowerCase());
}


const onHandleSearchClick = (e:any) =>{
  e.preventDefault();
  const rankSearch =  highRankingDataSort.filter((item:any)=>{
    return item.summonerName.toLowerCase().includes(search.toLowerCase());})
    if(rankSearch){
      navigate(`?page=${page}`)
    }
  setSearch("");
};

  return (
    <>
    <Header />
    <main className='rank_main'>
      <div>** 챌린져 ~ 마스터까지의 랭킹만 나옵니다 **</div>
      <form className='rank_form'>
        <fieldset>
            <legend className='blind'>소환사 랭킹 검색창</legend>
        <div className='rank_input'>
            <input type="search"  placeholder='소환사 명' value={search} onChange={onChangeSearch} className='rank_search' title='검색' />
            <button type='submit' onClick={onHandleSearchClick}><FaSearch / ></button>
        </div>
        </fieldset>
      </form>
      <table className='rank_table'>
        <caption className='blind'>랭킹표</caption>
        <colgroup>
          <col className='ranking' />
          <col className='summoner' />
          <col className='tier' />
          <col className='LP' />
          <col className='winning_rate' />
        </colgroup>
        <thead>
          <tr>
            <th scope='col'>순위</th>
            <th scope='col'>소환사명</th>
            <th scope='col'>티어</th>
            <th scope='col'>LP</th>
            <th scope='col'><span>승률</span></th>
          </tr>
        </thead>
        <tbody>
          <RankingData page={page} rank={postsData(highRankingDataSort)} Crank={Crank} GMrank={GMrank} Mrank={Mrank}   />
        </tbody>
      </table>
      <Pageing setPage={setPage} page={page} limit={limit} totalPosts={totalPosts} rank={postsData(highRankingDataSort)}  />
    </main>
    </>
    )
}

export default Ranking;
