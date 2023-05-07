import React, { useEffect, useState } from 'react'
import {lolAxios} from '../../axios';
import "../../scss/Ranking/ranking.scss"
import RankingData from './RankingData';
import RankingPage from './RankingPage';
import RankSearch from './RankSearch';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { RootState, rank } from '../../type/type';


function Ranking(){
const [currentPage, setCurrentPage] = useState<string>("1");
const [itemsPerPage, setItemsPerPage] = useState<number>(100);
const navigate = useNavigate();
const dispatch = useDispatch();

  // 챌린져API
  const getCRankingData = async() => {
    const res = await lolAxios.get(`/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`)
      try{
        dispatch({type:"summonerDataReducer/RankDatas", payload:res.data})
      }catch(error){
        console.log(error);
      }
      getGMRankingData();
  }

  // 그랜드마스터API
  const getGMRankingData = async() => {
  const res2 = await lolAxios.get(`/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5`)
    try{
      dispatch({type:"summonerDataReducer/RankDatas", payload:res2.data})
    }catch(error:any){
      console.log(error);
    }
    getMRankingData();
  }
  
    // 마스터API
  const getMRankingData = async() => {
    const res3 = await lolAxios.get(`/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5`)
      try{
        dispatch({type:"summonerDataReducer/RankDatas", payload:res3.data})
      }catch(error){
        console.log(error);
      }
  }

  const rankDataSeletor = useSelector((state:any)=> state.summonerData.rankDataArray);
  const point ="leaguePoints";
  //  랭킹 순서대로 정렬, 읽기전용값 새배열로 복사
  const rankDatas = rankDataSeletor.slice().map((rank:rank)=>rank.entries.slice());
  // 챌린져,그마,마스터 각각의 유저수
  const rankLength = rankDataSeletor.slice().map((rank:rank)=>rank.entries.length);
  // 한배열안에 모두담음
  const flattenedRankDatas = rankDatas.reduce((acc:any, val:any) => acc.concat(val), []); 
  // 한배열안에 있는 값을 leaguePoint순으로 정렬함
  const highRankingDataSort =  flattenedRankDatas.sort(((a:rank,b:rank)=>{
    return   b[point] - a[point] 
  }))
  // 페이지네이션 사용으로 배열자르기(랭크순위추가)
  const rankedData = highRankingDataSort.map((rank:rank, index:number) => ({...rank, rank: index + 1}));

  const indexOfLastItem = Number(currentPage) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRankResult = rankedData.slice(indexOfFirstItem, indexOfLastItem);

  // 검색한 값
  const rankSearchedSeletor = useSelector((state:RootState)=> state.summonerData.rankSearchArray)

  console.log(rankSearchedSeletor)
  useEffect(()=>{
    navigate({
      search: `?${createSearchParams({page: currentPage})}`,
    })
  },[currentPage])

  useEffect(()=>{
    getCRankingData();
    // 새로고침 시 다시1페이지로 주소값 변경
    
    navigate({
      search: `?${createSearchParams({page: "1"})}`,
    })
    // 뒤로가기했을때 같은값이 중복되서 계속 쌓이는걸 방지해서 초기화
    return () => {dispatch({type:"summonerDataReducer/RankReset"})}
  },[])

  return (
    <>
    <main className='rank_main'>
      <div className='notion'>** 챌린져 ~ 마스터까지의 랭킹만 나옵니다 **</div>
      <form className='rank_form'>
        <fieldset>
            <legend className='blind'>소환사 랭킹 검색창</legend>
            <RankSearch rankSearchedSeletor={rankSearchedSeletor} dispatch={dispatch} navigate={navigate} />
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
          <RankingData dispatch={dispatch} rankSearchedSeletor={rankSearchedSeletor} rankLength={rankLength} currentRankResult={currentRankResult}   />
        </tbody>
      </table>
      <RankingPage rankSearchedSeletor={rankSearchedSeletor} setCurrentPage={setCurrentPage}  highRankingDataSort={highRankingDataSort}  itemsPerPage={itemsPerPage}  />
    </main>
    </>
    )
}

export default Ranking;
