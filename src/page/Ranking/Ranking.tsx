import React from 'react'
import Header from '../../components/Header';
import { FaSearch } from 'react-icons/fa';
import '../../scss/ranking.scss';


function Ranking(){
  return (
    <>
    <Header />
    <main className='rank_main'>
      <form className='rank_form'>
        <fieldset>
            <legend className='blind'>소환사 랭킹 검색창</legend>
        <div className='rank_input'>
            <input type="search"  placeholder='소환사 명' className='rank_search' title='검색' />
            <button type='submit'><FaSearch / ></button>
        </div>
        <div className='order_btn'>
            <button type='button'>레벨순</button>
            <button type='button'>티어순</button>
        </div>
        </fieldset>
      </form>
      <table className='rank_table'>
        <caption className='blind'>랭킹표</caption>
        <colgroup>
          <col className='ranking' />
          <col className='summoner' />
          <col className='tier' />
          <col className='LP' />
          <col className='level' />
          <col className='winning_rate' />
        </colgroup>
        <thead>
          <tr>
            <th scope='col'>순위</th>
            <th scope='col'>소환사명</th>
            <th scope='col'>티어</th>
            <th scope='col'>LP</th>
            <th scope='col'>레벨</th>
            <th scope='col'><span>승률</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href='#'>1</a></td>
            <td><a href='#'>sunhongod</a></td>
            <td><a href='#'>(아이콘)그랜드마스터</a></td>
            <td><a href='#'>6 LP</a></td>
            <td><a href='#'>100</a></td>
            <td><a href='#'><span>55%</span></a></td>
          </tr>
        </tbody>
      </table>
      <div className='paging'>
            <ul>
              <li className='prev'><a href='#'>이전</a></li>
              <li><a href='#'>1</a></li>
              <li><a href='#'>2</a></li>
              <li><a href='#'>3</a></li>
              <li><a href='#'>4</a></li>
              <li><a href='#'>5</a></li>
              <li><a href='#'>6</a></li>
              <li><a href='#'>7</a></li>
              <li><a href='#'>8</a></li>
              <li><a href='#'>9</a></li>
              <li><a href='#'>10</a></li>
              <li className='next'><a href='#'>다음</a></li>
            </ul>
      </div>
    </main>
    </>
    )
}

export default Ranking;
