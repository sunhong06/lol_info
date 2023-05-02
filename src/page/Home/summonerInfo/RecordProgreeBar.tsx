import React, { useEffect } from 'react'
import styled from 'styled-components';
// 프로그래스바 문제가 배열안에 한경기의 블루팀,레드팀이 배열안에 들어있어야 하는데 하나씩 받아오기때문에 계산불가
function RecordProgreeBar({totalDamageDealtToChampions}:any) {
     
// const dealt = Math.floor((num / maxNum) * 100)
    // const damage = matchinfoSelector.map((m:any)=> m.info.participants.map((p:any)=> p.totalDamageDealtToChampions))
    // console.log(damage)
                // const sum = damage.reduce((acc:any,value:any) => acc + value, 0)
    
                return (
                  //   <div className="progress-bar-container">
                  //   {damage.map((value:any, index:number) => {
                  //     // Calculate the percentage of the current value
                  //     const percent = (value / sum) * 100;
              
                  //     // Apply the percentage to the width of the progress bar
                  //     const style = { width: `${percent}%` };
              
                  //     return (
                  //       <div key={index} className="progress-bar">
                  //         <div className="progress-bar-fill" style={style} />
                  //         <div className="progress-bar-text">{`${value} (${percent.toFixed(1)}%)`}</div>
                  //       </div>
                  //     );
                  //   })}
                  // </div>
                  <></>
                  )
        }

        const Progress = styled.div`
        width: 60px;
        height: 7px;
        margin: 0 auto;
        background-color: #eee;
      `;
      
      const Dealt = styled.div<{ dealt: number }>`
        background-color: red;
        width: ${(props) => props.dealt + "%"};
        height: 100%;
      `;
export default RecordProgreeBar
