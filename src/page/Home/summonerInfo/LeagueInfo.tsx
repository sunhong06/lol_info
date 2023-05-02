import React from 'react'
import { summonerLeague } from '../../../type/type';
import '../../../scss/Home/SummonerInfo/LeagueInfo.scss'
import { useSelector } from 'react-redux';


function LeagueInfo() {
  
  const LeagueDataSeletor = useSelector((state: any) => state.summonerData.LeagueDataArray);
  
  return (
  <>
    <div className='rank_box'>
      {LeagueDataSeletor.map((leagueData:any)=>( leagueData[0]  ?
      <div className='rank_data'>
        <h2>{leagueData.queueType == "RANKED_SOLO_5x5" ? "개인" : "자유"}랭크</h2>
        <div className='rank_info'>
          <img src={`../imgs/${leagueData[0].tier}.png`} alt={leagueData[0].tier} className="tier_img" />
          <ul className='rank_info_list'>
            <li>티어 {leagueData[0].tier}  {leagueData[0].rank}</li>
            <li>승률 {leagueData[0].wins}W {leagueData[0].losses}L  <span className='win_rate'>{Math.round(leagueData[0].wins / (leagueData[0].wins + leagueData[0].losses) * 100)}%</span></li>
            <li>포인트 {leagueData[0].leaguePoints}LP </li>
          </ul>
      </div>
      </div>     
      :
      <div className='rank_data'>
        <h2>개인랭크<span className='unranked'>Unranked</span></h2>
      </div>))}
      {LeagueDataSeletor.map((leagueData:any)=>( leagueData[1]  ?
      <div className='rank_data'>
        <h2>{leagueData.queueType == "RANKED_SOLO_5x5" ? "개인" : "자유"}랭크</h2>
        <div className='rank_info'>
          <img src={`../imgs/${leagueData[1].tier}.png`} alt={leagueData[1].tier} className="tier_img" />
          <ul className='rank_info_list'>
            <li>티어 {leagueData[1].tier}  {leagueData[1].rank}</li>
            <li>승률 {leagueData[1].wins}W {leagueData[1].losses}L  <span className='win_rate'>{Math.round(leagueData[1].wins / (leagueData[1].wins + leagueData[1].losses) * 100)}%</span></li>
            <li>포인트 {leagueData[1].leaguePoints}LP </li>
          </ul>
        </div>
      </div>     
      :
      <div className='rank_data'>
        <h2>자유랭크<span className='unranked'>Unranked</span></h2>
      </div>))}
    </div>
  </>
  )
}

export default LeagueInfo;