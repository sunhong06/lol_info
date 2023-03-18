import React, {useRef} from 'react'
import { connect } from 'react-redux';
import useOnclickOutside from '../../hook/useOnclickOutside';
import "../../scss/ChampDetail.scss"
import championfull from "../../data/championFull.json"
import { ChampionsRemove } from '../../store/store';


function ChampDetail({setDetail,champsInfo,ChampionRemove}:any) {
    const ref = useRef<HTMLDivElement>(null);
    const onClose =() =>{
      setDetail(false);
      ChampionRemove(champsInfo)
    }

    const notImg = (e:any) =>{
      e.target.parentNode.outerHTML =""
    }


    // const HeadlesideClick = () =>{

    // }
    // useOnclickOutside(ref,  HeadlesideClick);
  return (
    <div className='presentation'>
        <div className='wrapper_Detail'>
            <div className='Detail' ref={ref}>
            <span className='Detail_close' onClick={onClose}>X</span>
            {champsInfo.map((info:any)=> 
            <>
            <img className='champ_img' key={info[1].key} src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info[0]}_0.jpg`} alt={info[0]} />
            <div className='champ_info'>
              <span className='champ_name'>{info[1].name},</span>
              <span className='champ_title'>{info[1].title}</span>
                <div className='blurb'>{info[1].blurb}</div>
                <h2>SKILLS</h2>
                <>
                <ul className='champ_skills'>
                  <li className='p_skill'>
                  <img src={`${process.env.PUBLIC_URL}/imgs/passive/${info[0]}_P.png`} alt={`${info[0]}Passive`} />
                  <span className='skill_command'>P</span>
                  <div className='skill_ex'>
                    {/* <h3>{full[1].passive.name}</h3>
                    <h3>{full[1].passive.description}</h3> */}
                    </div>
                  </li>
                  <li className='q_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}Q.png`} alt={`${info[0]}q_Skill`} />
                    <span className='skill_command'>Q</span>
                    <div className='skill_ex'>
                      {/* <h3>{full[1].spells[0].name}</h3>
                      <p>{full[1].spells[0].description}</p> */}
                    </div>
                  </li>
                  <li className='w_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}W.png`} alt={`${info[0]}w_Skill`} />
                    <span className='skill_command'>W</span>
                    <div className='skill_ex'>
                      {/* <h3>{full[1].spells[1].name}</h3>
                      <p>{full[1].spells[1].description}</p> */}
                    </div>
                  </li>
                  <li className='e_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}E.png`} alt={`${info[0]}e_Skill`} />
                    <span className='skill_command'>E</span>
                    <div className='skill_ex'>
                      {/* <h3>{full[1].spells[2].name}</h3>
                      <p>{full[1].spells[2].description}</p> */}
                    </div>
                  </li>
                  <li className='r_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}R.png`} alt={`${info[0]}r_Skill`} />
                    <span className='skill_command'>R</span>
                    <div className='skill_ex'>
                      {/* <h3>{full[1].spells[3].name}</h3>
                      <p>{full[1].spells[3].description}</p> */}
                    </div>
                  </li>
                </ul>
                  </>
                <h2>SKIN</h2>
                <ul className='champ_skins'>
                    {Array(14).fill("").map(( _,idx:number)=>
                      <li key={idx}><img src={`${process.env.PUBLIC_URL}/imgs/loading/${info[0]}_${idx+1}.jpg`} alt={`${info[0]}_Skin`} onError={notImg}/> </li>
                    )}  
                </ul>
            </div>
            </>
            )}
            </div>
        </div>   
    </div>
  )
}

function mapStateToProps(state:any){
  return { 
    champsInfo:state.Champ
 }

}
function mapDispatchToProps(dispatch:any){
  return {
    ChampionRemove: (champs:any) => dispatch(ChampionsRemove(champs))
}
}

export default connect(mapStateToProps,mapDispatchToProps) (ChampDetail);