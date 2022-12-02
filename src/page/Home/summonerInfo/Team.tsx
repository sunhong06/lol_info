import React from 'react'
import { Iprops, match } from '../../../type/type';
import '../../../scss/Team.scss';

function Team(props: Iprops) {
    const {setMacthInfo,macthInfo} = props;
    
  return (
    <div>
       <table className='same_team'>
       <caption className='same_team_title'>같은 팀으로 게임한 소환사들 (최근 20 게임)</caption>
       <thead>
        <tr>
            <th scope='col'>소환사</th>
            <th scope='col'>게임</th>
            <th scope='col'>승-패</th>
            <th scope='col'>승률</th>
          </tr>
       </thead>
       <tbody>

       </tbody>
       </table>
    </div>
  )
}

export default Team