import React, { useEffect,useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function RankingData({rank,Crank,GMrank,Mrank,totalPosts,ranks}:any) {
  let count = 0;
  const location = useLocation()
  console.log(location)
  return (
    <>
        {rank.map((ranking:any,index:number)=> 
        <tr key={index}>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{index+1}</Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{ranking.summonerName}</Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">
            {Crank.length > count ? (count++, "Challenger") :  Crank.length + GMrank.length > count ? (count++, "GrandMaster") : Mrank.length > count ? (count++, "Master") : undefined}
            </Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{ranking.leaguePoints} LP</Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{ranking.wins}W  {ranking.losses}L {Math.round(ranking.wins / (ranking.wins + ranking.losses) * 100)}%</Link></td>
        </tr>
        )}
    </>
  )
}

export default RankingData;