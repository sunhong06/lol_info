import React, { useEffect } from 'react'
import Header from '../../components/Header';
import LeagueInfo from './summonerInfo/LeagueInfo'
import '../../scss/summonerInfo.scss'
import Team from './summonerInfo/Team'
import RecordInfo from './summonerInfo/RecordInfo';
import { LgInfo } from '../../store/store';
import { connect } from 'react-redux';
import {lolAxios} from '../../axios';
import { useLocation } from 'react-router-dom';




function SummonerInfo({sData,Smr}:any) {

  const location = useLocation();
  const search  = location.state;

  const getSummonerData = async() => {
      await lolAxios.get(`summoner/v4/summoners/by-name/${search}`)
        .then(((res) => { 
          sData(res.data);
        })).catch((error) => {
          console.log(error)
        })
    }
    useEffect(()=>{
      getSummonerData();
    },[search])

  return (
    <>
      <Header />
      <main className='summoner_main'>
      <div className='summoner_main_inner'>
        {Smr.length == 1 ?
          <>
            {Smr.map((s:any)=>
            <div className='summoner_info' key={s.smrData.id}>
                <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/${s.smrData.profileIconId}.png`} className="profile_icon" />
                <h2 className='summoner_id'>{s.smrData.name}</h2>
                <span className='summoner_level'>{s.smrData.summonerLevel}</span>
            </div>
            )}
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
const mapStateToProps = (state:any) =>{
  return {
    Smr: state.data
  }
}

function mapDispatchToProps(dispatch:any){
  return {
      sData: (smrData:any) => dispatch(LgInfo(smrData))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)  (SummonerInfo);
