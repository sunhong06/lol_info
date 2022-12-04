import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import LeagueInfo from './summonerInfo/LeagueInfo'
import '../../scss/summonerInfo.scss'
import Team from './summonerInfo/Team'
import { propsType,match } from '../../type/type';
import SumInfo from './summonerInfo/SumInfo';
import RecordInfo from './summonerInfo/RecordInfo';




function SummonerInfo(props: propsType) {

  const [searchValue, setSearchValue] = useState(true);
  const [divide, setDivide] = useState(true);
  const [macthInfo, setMacthInfo] = useState<match[]>([]);




  // const macthdata = macth.data.map(async (mh:any)=>{await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${mh}?api_key=${API_KEY}`)})
  // const getMacthInfoData = async() => {
  //   const macthInfoAPI = macthData.map((macth) => `https://asia.api.riotgames.com/lol/match/v5/matches/${macth}?api_key=${API_KEY}`);
  //   macthInfoAPI.map(async (API:any) => {
  //     await axios.get(API)
  //       .then(((res4) => {
  //         setMacthInfo(res4.data.info.participants);
  //         setQueueId(res4.data.info.queueId);
  //         setMacthId(res4.data.metadata.matchId);
  //         setMinutes(Math.floor(res4.data.info.gameDuration / 60));
  //         setSeconds(res4.data.info.gameDuration - Math.floor(res4.data.info.gameDuration / 60) * 60);
  //         setAverage(res4.data.info.teams);
  //       })).catch((error) => {
  //         console.log(error);
  //       })
  //   })
  // }


  // const getChampionsLevelData = async() =>{
  //   const ChampionLevelAPI = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerData?.id}?api_key=${API_KEY}`;
  //   await axios.get(ChampionLevelAPI)
  //   .then(((res3) =>{
  //     setChampionLevelData(res3.data);
  //     console.log(res3.data)
  //   })).catch((error) => {
  //     console.log(error);
  //     setSearchValue(false);
  //   })
  // }

  // const getChampionsData = async() =>{
  //   const ChampionLevelAPI = `https://ddragon.leagueoflegends.com/cdn/10.6.1/data/ko_KR/champion.json`;
  //   await axios.get(ChampionLevelAPI)
  //   .then(((res4) =>{
  //     setChampionData(res4.data);
  //     console.log(res4.data)

  //   })).catch((error) => {
  //     console.log(error);
  //     setSearchValue(false);
  //   })
  // }


  return (
    <>
      <Header />
      <main className='summoner_main'>
      <div className='summoner_main_inner'>
        {searchValue ?
          <>
            <SumInfo />
            <LeagueInfo />
            <RecordInfo />
              <Team />
          </>
          :
          <div>
            <p>소환사의 정보가 없습니다. 오타를 확인해주세욥!</p>
          </div>
        }
      </div>
      </main>
    </>
  )
}

export default SummonerInfo;
