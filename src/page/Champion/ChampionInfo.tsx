import React from 'react'
import Header from '../../components/Header';
import '../../scss/champion.scss'

function ChampionInfo() {
  return (
    <>
    <Header />
    <main>
      <h2 className='champion_title'>챔피언정보</h2>
      <table className='champion_table'>
        <caption className='blind'>챔피언정보</caption>
        <colgroup>

        </colgroup>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </main>
    </>
  )
}

export default ChampionInfo;
