import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { asiaLolAxios } from '../../../axios'
import { match } from '../../../type/type';
import { FiChevronDown } from 'react-icons/fi';
import { MatchInfo } from '../../../store/store'
import styled from 'styled-components'
import '../../../scss/Home/SummonerInfo/RecordInfo.scss'

function RecordInfo({ matchState, matchsInfo, Smr }: any) {
  const [startingNum, setStartingNum] = useState(10);
  const [countingNum, setCountingNum] = useState(20);
  const [matchInfo,setMatchInfo] = useState([]);

  const getMatchData = async () => {
    const r =  await asiaLolAxios.get(`match/v5/matches/by-puuid/${Smr[0].puuid}/ids?start=0&count=10&`)
        // start=0&count=15&
        .then((res3: { data: string[]; }) => {
          res3.data.map(async (i: string) => {
            await asiaLolAxios.get(`match/v5/matches/${i}`)
              .then((res) => {
                matchsInfo(res.data)
              }).catch((error) => {
                if(error.code === "ERR_BAD_REQUEST"){
                setTimeout(async ()=> {return await asiaLolAxios.get(error.config.url).then((res)=> { matchsInfo(res.data)})} ,100 )

                  // return ()=> clearTimeout(timer);
                }
              })
          })
        }).catch((error: any) => {
          if(error.code === "ERR_BAD_REQUEST"){
            console.log(error.config.url)
          }
        })
    }

  useEffect(() => {
    const timer = setTimeout(() => {
      getMatchData();
    }, 5000);

    return () => clearTimeout(timer);    
  
  }, [Smr])

  const handleMoreClick = async () => {
    await asiaLolAxios.get(`match/v5/matches/by-puuid/${Smr.map((s: any) => s.puuid)}/ids?start=${startingNum}&count=${countingNum}&`)
      // start=0&count=100&
      .then((res3) => {
        res3.data.map(async (i: string) => {
          await asiaLolAxios.get(`match/v5/matches/${i}`)
            .then((res) => {
              matchsInfo(res.data)
            }).catch((error) => {
              if(error.code === "ERR_BAD_REQUEST"){
                setTimeout(async ()=> {return await asiaLolAxios.get(error.config.url).then((res)=> { matchsInfo(res.data)})} ,100 )

                  // return ()=> clearTimeout(timer);
              }        
            })
        })
      }).catch((error) => {
        console.log(error)
        
      })
    setStartingNum(startingNum + 10);
    setCountingNum(countingNum + 10);
  }

  const onDetail = (e: any) => {
    const detail = e.target.parentElement.parentElement.nextElementSibling;
    if (detail.style.display === "block") {
      detail.style.display = "none";
    } else {
      detail.style.display = "block";
    }
  }

  const arr = [...matchState];
  const matchStateSort = arr.sort((x: any, y: any) => x.info.gameCreation - y.info.gameCreation).reverse()

  return (
        <>
            <ul className='record'>
            {matchStateSort.map((m:any)=>(
              <>
              {m.info.participants.map((p:any)=> p.summonerName == Smr[0].name ?
              <li key={m.info.gameCreation} className={p.win ? 'record_list' : 'record_list_lose'}>
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
                      {p.win
                    ? <span className='win'>승리</span> : <span className='lose'>패배</span> 
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
                        <span className={                          
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "kda_five" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "kda_four" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "kda_three" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "kda_two" : undefined}>{((p.kills + p.assists) / p.deaths).toFixed(2)} <span className='kda_txt'>평점</span></span>
                      </div>
                      <div className='stats'>
                        <div className='kill_invo'>
                          킬관여 {m.info.teams.map((team:any)=>(team.teamId === p.teamId &&
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
                  {m.info.participants.map((p:any,index:number)=>( index > 4 ? 
                    <li>
                      <a href={`/lol_info/SummonerInfo/${p.summonerName}`} target="_blank" className="smr_link">
                      <img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />
                      {p.summonerName}
                      </a>
                      </li>
                      : undefined
                  ))}
                  </ul>
                  <ul>
                  {m.info.participants.map((p:any,index:number)=>( index < 5 ? 
                    <li>
                      <a href={`/lol_info/SummonerInfo/${p.summonerName}`} className="smr_link">
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
                      <th >{m.info.participants.map((p:any)=> p.summonerName === Smr[0].name ? p.win ? "패배팀" : "승리팀" : null)}</th>
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
                    <td className='s_name'><img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />{p.summonerName}</td>
                        <td className='detail_kda'>
                            <span>{p.kills}/<span className='deaths'>{p.deaths}</span>/{p.assists} ({m.info.teams.map((team:any)=>(team.teamId === p.teamId &&
                          Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)
                          ))}%)</span>
                            <span className={
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "five" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "four" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "three" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "two" : undefined
                              }>{((p.kills + p.assists) / p.deaths).toFixed(2)}</span>
                        </td>
                          <td className='damage'>
                            <Progress>
                            </Progress>
                            {p.totalDamageDealtToChampions}
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
                      <th >{m.info.participants.map((p:any)=> p.summonerName == Smr[0].name ? p.win ? "승리팀" : "패배팀" : null )}</th>
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
                    <td className='s_name'><img src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`} alt={p.championName} />{p.summonerName}</td>
                        <td className='detail_kda'>
                            <span>{p.kills}/<span className='deaths'>{p.deaths}</span>/{p.assists} ({m.info.teams.map((team:any)=>(team.teamId === p.teamId &&
                          Math.round((p.kills+p.assists) / team.objectives.champion.kills * 100)
                          ))}%)</span>
                            <span className={
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5 ? "five" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4 ? "four" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3 ? "three" :
                              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3 ? "two" : undefined
                              }>{((p.kills + p.assists) / p.deaths).toFixed(2)}</span>
                        </td>
                        <td className='damage'>
                          <Progress>
                          </Progress>
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
                    </tr>
                        ))}
                   </tbody>
                  </table>
                </div>
              </li>
              </>
    ))}
    <li className='more'><button onClick={handleMoreClick}>더보기</button></li>
            </ul>
        </>
  )
}


const Progress = styled.div`
  width: 60px;
  height: 7px;
  margin: 0 auto;
  background-color: #eee;
`;
const Dealt = styled.div<{ dealt: number }>`
  background-color: red;
  width: ${(props) => props.dealt + "%"};
  height: 100%;
`;

function mapStateToProps(state: any) {
  return {
    matchState: state.record,
    Smr: state.data,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    matchsInfo: (matchs: void) => dispatch(MatchInfo(matchs))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(RecordInfo);                                                       

function sleep(arg0: number) {
  throw new Error('Function not implemented.');
}
