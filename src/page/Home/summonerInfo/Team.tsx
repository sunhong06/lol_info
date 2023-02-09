import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import '../../../scss/Team.scss';

function Team({matchState}:any) {
  const [smrName,setSmrName] = useState([])



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
        <tr>
            <td></td>
            <td></td>
            <td></td>
        </tr>
       </tbody>
       </table>
    </div>
  )
}



function mapStateToProps(state:any){
  return { 
      matchState:state.record
   }
  }


export default connect(mapStateToProps) (Team);