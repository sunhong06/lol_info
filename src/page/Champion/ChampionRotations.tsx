import React from 'react'
import '../../scss/Champion/ChampionRotations.scss'
import { useDispatch } from 'react-redux'

function ChampionRotations({rotation,champs,setDetail}:any) {
const dispatch = useDispatch();

const handleDtailCilck = (champ:any) =>{
  dispatch({type:"summonerDataReducer/ChampionData", payload:champ})
    setDetail(true);  
}
  return (
    <>
     <table className='champion_Rotation'>
        <caption>이번주 챔피언 로테이션</caption>
        <tbody>
          <tr>
          {rotation.map((Id:number)=> Object.entries(champs).map((champ:any) => champ[1].key == Id && 
            <td className='rotations' key={champ[1].key}><button onClick={()=>handleDtailCilck(champ)}><img src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${champ[1].image.full}`} alt={champ[1].id} /></button></td>))}
          </tr>
          <tr>
          {rotation.map((Id:number)=> Object.entries(champs).map((champ:any) => champ[1].key == Id && 
            <td key={champ[1].key} className='champ_name'>{champ[1].name}</td>))}
          </tr>
        </tbody>
      </table>
   </>
  )
}


export default (ChampionRotations);