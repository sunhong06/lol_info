import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { lolAxios } from '../../axios';
import '../../scss/Champion/ChampionInfo.scss'
import ChampDetail from './ChampDetail';
import Champion from './Champion';
import ChampionRotations from './ChampionRotations';
import ChampoinSearch from './ChampoinSearch';

function ChampionInfo() {
  const [champs,setChamps] = useState([]);
  const [rotation, setRotation] = useState([]);
  const [detail, setDetail] = useState<boolean>(false);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    rotations();
    ChampInfos();
  },[])

  const ChampInfos = async() =>{
    await axios.get("https://ddragon.leagueoflegends.com/cdn/13.3.1/data/ko_KR/champion.json")
    .then((res) => {
      setChamps(res.data.data)
    }).catch((error) => {
      console.log(error);
    })
  }
  const rotations = async() =>{
    await lolAxios.get(`platform/v3/champion-rotations`)
    .then((res) => {
      setRotation(res.data.freeChampionIds)
    }).catch((error) => {
      console.log(error);
    })
  }


  return (
    <>
    <main>
      <h2 className='champion_title'>챔피언정보</h2>
      <ChampionRotations rotation={rotation} champs={champs} setDetail={setDetail} />
      <ChampoinSearch  setSearch={setSearch} search={search} />
      <ul className='champion_table'>
          <Champion setDetail={setDetail} champs={champs} search={search} />
      </ul>
          {detail && <ChampDetail setDetail={setDetail} />}
    </main>
    </>
  )
}




export default (ChampionInfo);
