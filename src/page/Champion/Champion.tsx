import React from 'react'
import { connect } from 'react-redux';
import '../../scss/champion.scss'
import { Champions } from '../../store/store';

function Champion({champs,setDetail,champions,search}:any) {
  
  const HandleClickChampInfo = (champ:any) =>{
    champions(champ)
    setDetail(true);
  }

  return (
    <>
      {Object.entries(champs).filter((champ:any)=>{
          if(search == ""){
            return champ;
          } else if(champ[1].name.toLowerCase().includes(search.toLowerCase())){
            return champ;
          }
      })
      .map((champ:any) =>
      <li key={champ[1].key} className='champs'>
        <button key={champ[1].key} onClick={()=>HandleClickChampInfo(champ)}>
          <img src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${champ[1].image.full}`}  alt={champ[1].id} />
          </button>
          <div className='champ_name'>{champ[1].name}</div>
      </li>)}
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

export default connect(mapStateToProps,mapDispatchToProps) (Champion);