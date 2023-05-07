import React, {useRef} from 'react'
import useOnclickOutside from '../../hook/useOnclickOutside';
import "../../scss/Champion/ChampDetail.scss"
import { useSelector,useDispatch } from 'react-redux';
import { info } from '../../type/type';


function ChampDetail({setDetail}:any) {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const championSelector = useSelector((state:any)=> state.summonerData.ChampArray);

    // x버튼 클릭시 닫음
    const onClose =() =>{
      dispatch({type:"summonerDataReducer/ChampionsRemove"})
      setDetail(false);
    }
    
    // 없는 스킨은 빈값
    const notImg = (e:React.BaseSyntheticEvent) =>{
      e.target.parentNode.outerHTML =""
    }

    // 디테일 화면 밖 클릭 시 창 닫음
    const HeadlesideClick = () =>{
      onClose();
    }
    useOnclickOutside(ref,  HeadlesideClick);

  return (
    <div className='presentation'>
        <div className='wrapper_Detail'>
            <div className='Detail' ref={ref}>
            <span className='Detail_close' onClick={onClose}>X</span>
            {championSelector.map((info:info)=> 
            <div key={info[1].key}>
            <img className='champ_img'  src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info[0]}_0.jpg`} alt={info[0]} />
            <div className='champ_info'>
              <span className='champ_name'>{info[1].name},</span>
              <span className='champ_title'>{info[1].title}</span>
                <div className='blurb'>{info[1].blurb}</div>
                <h2>SKILLS</h2>
                <>
                <ul className='champ_skills'>
                  <li key={info[1].key} className='p_skill'>
                  <img src={`${process.env.PUBLIC_URL}/imgs/passive/${info[0]}_P.png`} alt={`${info[0]}Passive`} />
                  <span className='skill_command'>P</span>
                  </li>
                  <li className='q_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}Q.png`} alt={`${info[0]}q_Skill`} />
                    <span className='skill_command'>Q</span>
                  </li>
                  <li className='w_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}W.png`} alt={`${info[0]}w_Skill`} />
                    <span className='skill_command'>W</span>
                  </li>
                  <li className='e_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}E.png`} alt={`${info[0]}e_Skill`} />
                    <span className='skill_command'>E</span>
                  </li>
                  <li className='r_skill'>
                    <img src={`${process.env.PUBLIC_URL}/imgs/spell/${info[0]}R.png`} alt={`${info[0]}r_Skill`} />
                    <span className='skill_command'>R</span>
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
            </div>
            )}
            </div>
        </div>   
    </div>
  )
}


export default (ChampDetail);