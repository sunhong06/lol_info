import React, { useEffect,useState } from 'react'
import Header from '../../components/Header';
import LeagueInfo from './summonerInfo/LeagueInfo'
import '../../scss/Home/SummonerInfo/summonerInfo.scss'
import RecordInfo from './summonerInfo/RecordInfo';
import {asiaLolAxios, lolAxios} from '../../axios';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios, { Canceler } from 'axios';

function SummonerInfo() {
  const [loding,setLoding] = useState(false);
  const [startingNum,setStartingNum] = useState(0);
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const summonerName = location.state;
  //매치정보
  const matchInfoSelector = useSelector((state:any)=> state.summonerData.recordArray);
  //소환사데이터
  const summonerDataSeletor = useSelector((state:any)=> state.summonerData.summonerDataArray);

// Promise Chaining
// 첫 번째 API를 호출하고, 해당 API의 응답을 Promise로 반환 받습니다. 이후, Promise Chaining을 사용하여 
// 첫 번째 API의 응답 값을 파라미터로 다음 API를 호출합니다.
let cancel: Canceler;

 const getSummonerData = async(summonerName:any) => {
    // 소환사 정보API
  const res =  await lolAxios.get(`summoner/v4/summoners/by-name/${summonerName}`)
    try{
      dispatch({type:"summonerDataReducer/summoner", payload:res.data});
      const SummonerId = res.data.id;
      const Summonerpuuid = res.data.puuid;
      // 소환사 리그정보API
      summonerMatchData(Summonerpuuid);
      // 소환사 매치데이터API
      summonerLeagueInfo(SummonerId);
    }catch(error:any){ 
      console.log(error);
    }
  }
  // 소환사 매치데이터
  const summonerLeagueInfo = async (SummonerId:any) => {
    const res1 = await lolAxios.get(`/league/v4/entries/by-summoner/${SummonerId}`);
    dispatch({type:"summonerDataReducer/LeagueData", payload:res1.data});
  }

  // 소환사 리그정보
  const summonerMatchData = async (Summonerpuuid:any) =>{
    const res2:any =  await asiaLolAxios.get(`match/v5/matches/by-puuid/${Summonerpuuid}/ids?start=${startingNum}&count=20&`)
    const league = res2.data
      dispatch({type:"summonerDataReducer/MacthInfo", payload:res2.data})
      setStartingNum(startingNum + 20)
      // 소환사 매치정보API
      summonerMatchInfo(league);
  }

  //소환사 매치정보 
  const summonerMatchInfo = async(league:any) =>{
    for(const res2Data of league){
      const res3 =  await asiaLolAxios.get(`match/v5/matches/${res2Data}`,{cancelToken: new axios.CancelToken((c) => (cancel = c))})
        try{
        dispatch({type:"summonerDataReducer/MatchData", payload:res3.data})
        }
        catch(error: any){
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          }else{
            console.log(error)
          }
      }
    }
  }
  
  useEffect(()=>{
    getSummonerData(summonerName);
      if(summonerDataSeletor){
        setLoding(true)
      }else{
        setLoding(false)
      }
      
      // 뒤로가기했을때 같은값이 중복되서 계속 쌓이는걸 방지해서 초기화
      // 컴포넌트가 언마운트(unmount) 될 때, 불필요한 API 요청을 취소
    return () => {dispatch({type:"summonerDataReducer/ResetComponent"}), cancel();}
    },[dispatch])
    
  return (
    <>
    {loding ? 
    <>
    <Header />
    <main className='summoner_main'>
      <div className='summoner_main_inner'>
      {summonerDataSeletor.length >= 1 ?
      <>
        {summonerDataSeletor.map((s:any)=>
        <div className='summoner_info' key={s.id}>
          <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/${s.profileIconId}.png`} className="profile_icon" />
          <h2 className='summoner_id'>{s.name}</h2>
          <span className='summoner_level'>{s.summonerLevel}</span>
        </div>
        )}
        <div className='lol_info'>
          <LeagueInfo />
          <RecordInfo setStartingNum={setStartingNum} dispatch={dispatch}  getSummonerData={getSummonerData} startingNum={startingNum}  summonerMatchData={summonerMatchData} summonerDataSeletor={summonerDataSeletor} matchinfoSelector={matchInfoSelector} />
        </div>
      </>
      :
      <div className='no_info'>
        <p>소환사의 정보가 없습니다. 오타를 확인해주세욥!</p>
      </div>
      }
      </div>
    </main>
    </>
    :
    <>
    <Header />
      <div>
        <h1>로딩중</h1>
      </div>
    </>
    }
  </>
  )
}

export default React.memo(SummonerInfo);
