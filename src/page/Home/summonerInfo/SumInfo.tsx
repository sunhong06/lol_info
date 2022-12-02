import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom';
import { summoner } from '../../../type/type';
import {lolAxios} from '../../../axios';
import { connect } from 'react-redux';
import { LgInfo } from '../../../store/store';


function SumInfo({sData,Smr}:any) {
    const location = useLocation();
    const search  = location.state;

    const getSummonerData = async() => {
        await lolAxios.get(`summoner/v4/summoners/by-name/${search}`)
          .then(((res1) => { 
            sData(res1.data);
          })).catch((error) => {
            console.log(error)
          })
      }
      useEffect(()=>{
        getSummonerData();
      },[])
  return (
    <>
    {Smr.map((s:any)=>
    <div className='summoner_info' key={s.smrData.id}>
        <img src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/${s.smrData.profileIconId}.png`} className="profile_icon" />
        <h2 className='summoner_id'>{s.smrData.name}</h2>
        <span className='summoner_level'>{s.smrData.summonerLevel}</span>
    </div>
    )}
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


export default connect(mapStateToProps,mapDispatchToProps)  (SumInfo);