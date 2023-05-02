import React from 'react'
import { match } from '../../../type/type';
import { FiChevronDown } from 'react-icons/fi';
import '../../../scss/Home/SummonerInfo/RecordInfo.scss'
import RecordInfoDetail from './RecordInfoDetail';
import { Link } from 'react-router-dom';


function RecordInfo({setStartingNum,dispatch,getSummonerData,startingNum,summonerMatchData,summonerDataSeletor,matchinfoSelector}:any) {

  const onDetail = (e: any) => {
    const detail = e.target.parentElement.parentElement.nextElementSibling;
    if (detail.style.display === "block") {
      detail.style.display = "none";
    } else {
      detail.style.display = "block";
    }
  }
  const handleClickMore = () =>{
     // 소환사 매치데이터 더보기
     summonerMatchData(summonerDataSeletor[0].puuid);
  }

  const handleClickSummonerName = (e:any) =>{
    // 같이 한 플레이어 정보 클릭시
    // recordinfo컴포넌트에 각 유저이름정보를 가져와서 api를 불러와야함
    getSummonerData(e.target.innerText);
    setStartingNum(0);
    dispatch({type:"summonerDataReducer/ResetComponent"})
  }
  
  return (
  <>
    <ul className='record'>
    {matchinfoSelector.map((m:any)=>(
      <>
      {m.info.participants.map((p:any)=> p.summonerName == summonerDataSeletor[0].name ?
      <li key={p.gameId} className={p.win ? 'record_list' : 'record_list_lose'}>
        <div className='game_info'>
          <div className='date'>
            {new Date(m.info.gameCreation).getFullYear()+
            "/"+(new Date(m.info.gameCreation).getMonth()+1)+
            "/"+new Date(m.info.gameCreation).getDate()}
          </div>
          <div className='game_time'>{Math.round(m.info.gameDuration / 60)}분 {Math.round(m.info.gameDuration%60)}초</div>
          <div className='game_type'>
            {m.info.queueId === 450 && "무작위 총력전"}
            {m.info.queueId === 900 && "U.R.F"}
            {m.info.queueId === 420 && "솔랭"}
            {m.info.queueId === 430 && "일반"}
            {m.info.queueId === 440 && "자유 5:5랭크"}
          </div>
          <div className='game_result'>
            {p.win ? <span className='win'>승리</span> : <span className='lose'>패배</span> }    
          </div>
        </div>
        <div className='my_info'>
          <div className='champ_info'>
            <div className='champ_img'>
              <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />
               <span className='champ_level'>{p.champLevel}</span>
            </div>  
            <div className='k_d_a'>
              <div className='kda'>{p.kills} / <span className='deaths'>{p.deaths}</span> / {p.assists}</div>
              <span className={                          
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "kda_five" :
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "kda_four" :
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "kda_three" :
                Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "kda_two" : undefined}>
                {((p.kills + p.assists) / p.deaths).toFixed(2)} 
                <span className='kda_txt'>평점</span>
              </span>
            </div>
            <div className='stats'>
              <div className='kill_invo'>
                킬관여{m.info.teams.map((team:any)=>(team.teamId === p.teamId && Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)))}%
              </div>
              <div className='ward'>
                제어와드 {p.sightWardsBoughtInGame}
              </div>
              <div className='cs'>
                  CS {p.totalMinionsKilled}
              </div>
            </div>
          </div>
          <div className='items'>
            <ul className='item'>
              <li>{p.item0 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item0}.png`} alt="item1" /> : undefined}</li>
              <li>{p.item1 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item1}.png`} alt="item2" /> : undefined}</li>
              <li>{p.item2 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item2}.png`} alt="item3" /> : undefined}</li>
              <li>{p.item3 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item3}.png`} alt="item4" /> : undefined}</li>
              <li>{p.item4 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item4}.png`} alt="item5" /> : undefined}</li>
              <li>{p.item5 ?<img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item5}.png`} alt="item6" /> : undefined}</li>
            </ul>
            {p.pentaKills > 0 ? <div className='max_kills'>펜타킬</div> : 
              p.quadraKills > 0 ? <div className='max_kills'>쿼드라킬</div> :
              p.tripleKills > 0 ? <div className='max_kills'>트리플킬</div> : 
              p.doubleKills > 0 ? <div className='max_kills'>더블킬</div> : null}
          </div>
        </div>
        <div className='summoners'>
          <ul>
            {m.info.participants.map((p:any,index:number)=>( index > 4 ? 
                <li>
                  <Link to={`/SummonerInfo/${p.summonerName}`}  onClick={handleClickSummonerName} className="smr_link">
                  <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />
                  {p.summonerName}
                  </Link>
                </li>
                : undefined))}
              </ul>
              <ul>
              {m.info.participants.map((p:any,index:number)=>( index < 5 ? 
                <li>
                  <Link to={`/SummonerInfo/${p.summonerName}`} onClick={handleClickSummonerName} className="smr_link">
                  <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />
                    {p.summonerName}
                  </Link>
                </li>
                : undefined))}
              </ul>
            </div>
              <div className='ditails'>
                <button onClick={onDetail}>
                  <FiChevronDown />
                </button>
              </div>
          </li> : null)}
          <RecordInfoDetail getSummonerData={getSummonerData} setStartingNum={setStartingNum} dispatch={dispatch} m={m} summonerDataSeletor={summonerDataSeletor} />
        </>))}
      {/*   100개의 전적 이후에는 받아오는 값이 없음 */}
      {startingNum <= 100 ?
      <li className='more'><button onClick={handleClickMore}>더보기</button></li>
      :
      undefined
      }
    </ul>
  </>
  )
}




export default RecordInfo;                                                       

