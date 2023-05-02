import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function RankingData({dispatch,rankSearchedSeletor,currentRankResult,rankLength}:any) {
  const navigate = useNavigate();
  const handleClickSummonerName = (e:any) =>{
    // 같이 한 플레이어 정보 클릭시
    // recordinfo컴포넌트에 각 유저이름정보를 가져와서 api를 불러와야함
    const summonerName = e.target.parentNode.children[1].innerText;
    console.log(summonerName);
    navigate(`/SummonerInfo/${summonerName}`, {state: summonerName})
    dispatch({type:"summonerDataReducer/ResetComponent"})
  }
  
  return (
    <>
    {currentRankResult.map((ranking:any,index:number)=>(
    rankSearchedSeletor.length < 1 ?
    <tr key={index} onClick={handleClickSummonerName}>
      <td>{ranking.rank}</td>
      <td>{ranking.summonerName}</td>
      <td>
        {ranking.rank <= rankLength[0] ? "CHALLENGER" : ranking.rank <= rankLength[1]+rankLength[0] ? "GRANDMASTER" : ranking.rank <= rankLength[2] && "MASTER"}
        </td>
      <td>{ranking.leaguePoints} LP</td>
      <td>{ranking.wins}W  {ranking.losses}L ({Math.round(ranking.wins / (ranking.wins + ranking.losses) * 100)}%)</td>
    </tr>
    :
    rankSearchedSeletor.queries.request[0].searchTerms == ranking.summonerName &&
    <tr key={index}>
      <td>{ranking.rank}</td>
      <td>{ranking.summonerName}</td>
      <td>
        {ranking.rank <= rankLength[0] ? "CHALLENGER" : ranking.rank <= rankLength[1]+rankLength[0] ? "GRANDMASTER" : ranking.rank <= rankLength[2] && "MASTER"}
        </td>
      <td>{ranking.leaguePoints} LP</td>
      <td>{ranking.wins}W  {ranking.losses}L ({Math.round(ranking.wins / (ranking.wins + ranking.losses) * 100)}%)</td>
    </tr>))
    }
    </>
  )
}

export default RankingData;