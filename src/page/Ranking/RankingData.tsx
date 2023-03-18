import React, { useEffect,useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

function RankingData({page,rank,Crank,GMrank,Mrank,search}:any) {
  const [counting, setCounting] = useState(0);

useEffect(()=>{
  setCounting(100 * (page))
},[page])
  return (
    <>
        {rank.filter((ranking:any)=>{
        if(search == ""){
         return ranking;   
        }else if(ranking.summonerName.toLowerCase().includes(search.toLowerCase())){
         return ranking}
        })
        .map((ranking:any,index:number)=> 
        <tr key={index}>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{counting+index+1-100}</Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{ranking.summonerName}</Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">
            {Crank.length > counting ? ("Challenger") :  Crank.length + GMrank.length > counting ? ("GrandMaster") : Crank.length + GMrank.length+Mrank.length > counting ? ("Master") : undefined}
            </Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{ranking.leaguePoints} LP</Link></td>
          <td><Link to={`/SummonerInfo/${ranking.summonerName}`} target="_blank">{ranking.wins}W  {ranking.losses}L ({Math.round(ranking.wins / (ranking.wins + ranking.losses) * 100)}%)</Link></td>
        </tr>
        )}
    </>
  )
}

export default RankingData;