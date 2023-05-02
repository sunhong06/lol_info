import React from 'react'
import RecordProgreeBar from './RecordProgreeBar';
import { Link } from 'react-router-dom';

function RecordInfoDetail({getSummonerData,setStartingNum,dispatch,m,summonerDataSeletor}:any) {

  const handleClickSummonerName = (e:any) =>{
    // 같이 한 플레이어 정보 클릭시
    // recordinfo컴포넌트에 각 유저이름정보를 가져와서 api를 불러와야함
    getSummonerData(e.target.innerText);
    setStartingNum(0);
    dispatch({type:"summonerDataReducer/ResetComponent"})
  }

  return (
  <>
    <li className='detail'>
      <div className='detail_box'>
        <table>
          <colgroup>
            <col width="185" />
            <col width="100" />
            <col width="85" />
            <col width="85" />
            <col width="80" />
            <col width="40" />
          </colgroup>
          <caption>종합</caption>
          <thead>
            <tr>
              <th >{m.info.participants.map((p:any)=> p.summonerName == summonerDataSeletor[0].name ? p.win ? "패배팀" : "승리팀" : null)}</th>
              <th>KDA</th>
              <th colSpan={2}>피해량</th>
              <th>골드</th>
              <th>CS</th>
              <th>아이템</th>
            </tr>
          </thead>
          <tbody>
          {m.info.participants.map((p:any,index:number)=>(index > 4 &&
            <tr key={index} className={p.win ? "win" : "lose"}>
              <td className='s_name'><img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} /><Link to={`/SummonerInfo/${p.summonerName}`} onClick={handleClickSummonerName}>{p.summonerName}</Link></td>
              <td className='detail_kda'>
                <span>
                  {p.kills}/<span className='deaths'>{p.deaths}</span>/{p.assists} 
                  ({m.info.teams.map((team:any)=>(team.teamId === p.teamId &&Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)))}%)
                </span>
                <span className={
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "five" :
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "four" :
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "three" :
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "two" : undefined}>
                  {((p.kills + p.assists) / p.deaths).toFixed(2)}
                </span>
              </td>
              <td className='damage'> 
                {p.totalDamageDealtToChampions}
                <RecordProgreeBar totalDamageDealtToChampions={p.totalDamageDealtToChampions} />
              </td>
              <td className='damage'>
                {p.totalDamageTaken}
              </td>
              <td>{p.goldEarned}g</td>
              <td>{p.totalMinionsKilled}</td>
              <td>
                <ul className='item'>
                  <li>{p.item0 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item0}.png`} alt="item1" /> : undefined}</li>
                  <li>{p.item1 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item1}.png`} alt="item2" /> : undefined}</li>
                  <li>{p.item2 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item2}.png`} alt="item3" /> : undefined}</li>
                  <li>{p.item3 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item3}.png`} alt="item4" /> : undefined}</li>
                  <li>{p.item4 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item4}.png`} alt="item5" /> : undefined}</li>
                  <li>{p.item5 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item5}.png`} alt="item6" /> : undefined}</li>
                </ul>
              </td>
            </tr>))}
          </tbody>
        </table>
        <table>
          <colgroup>
            <col width="185" />
            <col width="100" />
            <col width="85" />
            <col width="85" />
            <col width="80" />
            <col width="40" />
          </colgroup>
          <thead>
            <tr>
              <th >{m.info.participants.map((p:any)=> p.summonerName == summonerDataSeletor[0].name ? p.win ? "승리팀" : "패배팀" : null )}</th>
              <th>KDA</th>
              <th colSpan={2}>피해량</th>
              <th>골드</th>
              <th>CS</th>
              <th>아이템</th>
            </tr>
          </thead>
          <tbody>
          {m.info.participants.map((p:any,index:number)=>( index<5 &&
            <tr key={index} className={p.win ? "win" : "lose"}>
              <td className='s_name'><img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} /><Link to={`/SummonerInfo/${p.summonerName}`} onClick={handleClickSummonerName}>{p.summonerName}</Link></td>
              <td className='detail_kda'>
                <span>
                  {p.kills}/<span className='deaths'>{p.deaths}</span>/{p.assists} 
                  ({m.info.teams.map((team:any)=>(team.teamId === p.teamId && Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)))}%)
                </span>
                <span className={
                  Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "five" :
                  Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "four" :
                  Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "three" :
                  Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "two" : undefined}>
                    {((p.kills + p.assists) / p.deaths).toFixed(2)}
                </span>
              </td>
              <td className='damage'>
                {p.totalDamageDealtToChampions}
              </td>
              <td className='damage'>
                {p.totalDamageTaken}
              </td>
              <td>{p.goldEarned}g</td>
              <td>{p.totalMinionsKilled}</td>
              <td>
                <ul className='item'>
                  <li>{p.item0 ? <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item0}.png`} alt="item1" /> : undefined}</li>
                  <li>{p.item1 ? <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item1}.png`} alt="item2" /> : undefined}</li>
                  <li>{p.item2 ? <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item2}.png`} alt="item3" /> : undefined}</li>
                  <li>{p.item3 ? <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item3}.png`} alt="item4" /> : undefined}</li>
                  <li>{p.item4 ? <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item4}.png`} alt="item5" /> : undefined}</li>
                  <li>{p.item5 ? <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item5}.png`} alt="item6" /> : undefined}</li>
                </ul>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </li>
  </>
  )
}



export default RecordInfoDetail;
