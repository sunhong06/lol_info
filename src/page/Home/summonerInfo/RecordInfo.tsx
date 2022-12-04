import React, { useEffect,useState,useRef } from 'react'
import { connect } from 'react-redux'
import {asiaLolAxios} from '../../../axios'
import { match } from '../../../type/type';
import {FiChevronDown} from 'react-icons/fi';
import { MatchInfo } from '../../../store/store'
import '../../../scss/RecordInfo.scss'
import { Link } from 'react-router-dom';

function RecordInfo({matchState,matchsInfo,Smr}:any) {

  
  const getMatchData = async() => {
    const match = await asiaLolAxios.get(`match/v5/matches/by-puuid/${Smr.map((s:any) =>s.smrData.puuid)}/ids`)
    Promise.all([match]).then((res3)=>{
      res3[0].data.map(async(i:any)=>{
         const res = await asiaLolAxios.get(`match/v5/matches/${i}`);
         matchsInfo(res.data);
      })
    }).catch((error)=>{
      console.log(error)
    })
  } 
  useEffect(()=>{
  getMatchData();
  },[Smr])

  const onDetail = (e:any) =>{
    const detail = e.target.parentElement.parentElement.nextElementSibling;
      if(detail.style.display == "none"){
        detail.style.display = "block";
    }else{
      detail.style.display = "none";
    }
  }
  
  return (
    <>
        <ul className='record'>
        {matchState.map((m:any)=>( 
          <>
          {m.matchs.info.participants.map((p:any)=> p.summonerName === Smr[0].smrData.name ?
          <li className={p.win ? 'record_list' : 'record_list_lose'}>
            <div className='game_info'>
              <div className='game_time'>{Math.round(m.matchs.info.gameDuration / 60)}분 {Math.round(m.matchs.info.gameDuration%60)}초</div>
              <div className='game_type'>
                {m.matchs.info.queueId === 450 && "무작위 총력전"}
                {m.matchs.info.queueId === 1900 && "U.R.F"}
                {m.matchs.info.queueId === 420 && "솔랭"}
                {m.matchs.info.queueId === 430 && "일반"}
                {m.matchs.info.queueId === 440 && "자유 5:5랭크"}
                </div>
                <div className='game_result'>
                  {p.win
                ?<span className='win'>승리</span> : <span className='lose'>패배</span> 
                }    
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
                    <span className='kda_sum'>{((p.kills + p.assists) / p.deaths).toFixed(2)} 평점</span>
                  </div>
                  <div className='stats'>
                    <div className='kill_invo'>
                      킬관여 {m.matchs.info.teams.map((team:any)=>(team.teamId === p.teamId &&
                      Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)
                      ))}%
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
                        {p.pentaKills > 0 ?  <div className='max_kills'>펜타킬</div> : 
                        p.quadraKills > 0 ?  <div className='max_kills'>쿼드라킬</div> :
                        p.tripleKills > 0 ?  <div className='max_kills'>트리플킬</div> : 
                        p.doubleKills > 0 ?  <div className='max_kills'>더블킬</div> : <div></div>
                        }
                </div>
              </div>
            <div className='summoners'>
            <ul>
              {m.matchs.info.participants.map((p:any,index:number)=>( index > 4 ? 
                <li>
                  <a href={`/SummonerInfo/${p.summonerName}`} target="_blank" className="smr_link">
                  <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />
                  {p.summonerName}
                  </a>
                  </li>
                  : undefined
              ))}
              </ul>
              <ul>
              {m.matchs.info.participants.map((p:any,index:number)=>( index < 5 ? 
                <li>
                  <a href={`/SummonerInfo/${p.summonerName}`} className="smr_link">
                  <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />
                  {p.summonerName}
                  </a>
                  </li>
                  : undefined
              ))}
              </ul>
            </div>
            <div className='ditails'>
              <button onClick={onDetail}>
                <FiChevronDown />
              </button>
            </div>
          </li> : null
          )}
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
                  <th >{m.matchs.info.participants.map((p:any)=> p.summonerName === Smr[0].smrData.name ? p.win ? "패배팀" : "승리팀" : null)}</th>
                  <th>KDA</th>
                  <th colSpan={2}>피해량</th>
                  <th>골드</th>
                  <th>CS</th>
                  <th>아이템</th>
                </tr>
              </thead>
              <tbody>
              {m.matchs.info.participants.map((p:any,index:number)=>( index>4 && 
                <tr className={p.win ? "win" : "lose"} >
                <td className='s_name'><img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />{p.summonerName}</td>
                    <td className='detail_kda'>
                        <span>{p.kills}/<span className='deaths'>{p.deaths}</span>/{p.assists} ({m.matchs.info.teams.map((team:any)=>(team.teamId === p.teamId &&
                      Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)
                      ))}%)</span>
                        <span className={
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "five" :
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "four" :
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "three" :
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "two" : undefined
                          }>{((p.kills + p.assists) / p.deaths).toFixed(2)}</span>
                    </td>
                      <td className='damage'><div className='box'></div>{p.totalDamageDealtToChampions}</td>
                      <td className='damage'><div className='box'></div>{p.totalDamageTaken}</td>
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
                </tr>
                 ))}
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
                  <th >{m.matchs.info.participants.map((p:any)=> p.summonerName === Smr[0].smrData.name ? p.win ? "승리팀" : "패배팀" : null )}</th>
                  <th>KDA</th>
                  <th colSpan={2}>피해량</th>
                  <th>골드</th>
                  <th>CS</th>
                  <th>아이템</th>
                </tr>
              </thead>
              <tbody>
                     {m.matchs.info.participants.map((p:any,index:number)=>( index<5 &&
                <tr className={p.win ? "win" : "lose"}>
                <td className='s_name'><img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />{p.summonerName}</td>
                    <td className='detail_kda'>
                        <span>{p.kills}/<span className='deaths'>{p.deaths}</span>/{p.assists} ({m.matchs.info.teams.map((team:any)=>(team.teamId === p.teamId &&
                      Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)
                      ))}%)</span>
                        <span className={
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "five" :
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "four" :
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "three" :
                          Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "two" : undefined
                          }>{((p.kills + p.assists) / p.deaths).toFixed(2)}</span>
                    </td>
                      <td className='damage'><div className='box'><div className='porgress_bar'></div></div>{p.totalDamageDealtToChampions}</td>
                      <td className='damage'><div className='box'><div className='porgress_bar'></div></div>{p.totalDamageTaken}</td>
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
                </tr>
                    ))}
               </tbody>
              </table>
            </div>
          </li>
          </>
              ))}
        </ul>
    </>
  )
}

function mapStateToProps(state:any){
    return { 
        matchState:state.record,
        Smr:state.data
     }
  }

  function mapDispatchToProps(dispatch:any){
    return {
        matchsInfo: (matchs:any) => dispatch(MatchInfo(matchs))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (RecordInfo);