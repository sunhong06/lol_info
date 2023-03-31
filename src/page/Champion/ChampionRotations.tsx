import React from 'react'
import { connect } from 'react-redux';
import '../../scss/Champion/ChampionRotations.scss'
import { Champions } from '../../store/store';

function ChampionRotations({rotation,champs,setDetail,champions}:any) {


const handleDtailCilck = (champ:any) =>{
    champions(champ)
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

function mapStateToProps(state:any){
  return { 
    champsInfo:state.Champ
 }
}

function mapDispatchToProps(dispatch:any){
  return {
    champions: (champs:any) => dispatch(Champions(champs))
}
}

export default connect(mapStateToProps,mapDispatchToProps) (ChampionRotations);