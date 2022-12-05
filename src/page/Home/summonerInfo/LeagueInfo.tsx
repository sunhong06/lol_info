import React, { useEffect,useState } from 'react'
import { summonerLeague } from '../../../type/type';
import {lolAxios} from '../../../axios';
import { connect } from 'react-redux';
import '../../../scss/LeagueInfo.scss'


function LeagueInfo({Smr}:any) {
  const [summonerLeagueData, setSummonerLeagueData] = useState<summonerLeague[]>([]);
  const getLeagueData = async() => {
    await lolAxios.get(`/league/v4/entries/by-summoner/${Smr.map((s:any) =>s.smrData.id)}`)
      .then(((res2) => {
        setSummonerLeagueData(res2.data);
      })).catch((error) => {
        console.log(error);
      })
  }
  useEffect(()=>{
    getLeagueData();
  },[Smr])
  return (
    <>
    <div className='rank_box'>
    {summonerLeagueData[0] ?
    <div className='solo_rank_info'>
    <h2>개인랭크</h2>
    <div className='rank_info'>
        <img src={`../imgs/${summonerLeagueData[0]?.tier}.png`} alt={summonerLeagueData[0]?.tier} className="tier_img" />
        <ul className='rank_info_list'>
        <li>티어 {summonerLeagueData[0]?.tier}  {summonerLeagueData[0]?.rank}</li>
        <li>승률 {summonerLeagueData[0]?.wins}W {summonerLeagueData[0]?.losses}L  <span className='win_rate'>{Math.round(summonerLeagueData[0]?.wins / (summonerLeagueData[0]?.wins + summonerLeagueData[0]?.losses) * 100)}%</span></li>
        <li>포인트 {summonerLeagueData[0]?.leaguePoints}LP </li>
        </ul>
    </div>
    </div>
    :
    <div className='solo_rank_info'>
    <h2>개인랭크<span className='unranked'>Unranked</span></h2>
    </div>
    }
    {summonerLeagueData[1] ?
    <div className='team_rank_info'>
    <h2>자유랭크</h2>
    <div className='rank_info'>
        <img src={`../imgs/${summonerLeagueData[1]?.tier}.png`} alt={summonerLeagueData[1]?.tier} className="tier_img" />
        <ul className='rank_info_list'>
        <li>티어 {summonerLeagueData[1]?.tier}  {summonerLeagueData[1]?.rank}</li>
        <li>승률 {summonerLeagueData[1]?.wins}W {summonerLeagueData[1]?.losses}L  <span className='win_rate'>{Math.round(summonerLeagueData[1]?.wins / (summonerLeagueData[1]?.wins + summonerLeagueData[1]?.losses) * 100)}%</span></li>
        <li>포인트 {summonerLeagueData[1]?.leaguePoints}LP </li>
        </ul>
    </div>
    </div>
    :
    <div className='team_rank_info'>
    <h2>자유랭크<span className='unranked'>Unranked</span></h2>
    </div>}
    </div>
    </>
  )
}

function mapStateToProps(state:any){
  return { Smr:state.data }
}




export default connect(mapStateToProps) (LeagueInfo);