import React from 'react'
import Header from '../../components/Header';
import {FaSearch} from 'react-icons/fa';
import '../../scss/community.scss';
import { Link } from 'react-router-dom';

function Community(){
  return (
    <>
    <Header />
    <main className='cmnt_main'>
      <div className='cmnt_category'>
        <ul>
          <li><a href='#'>전체</a></li>
          <li><a href='#'>자유</a></li>
          <li><a href='#'>질문,답변</a></li>
          <li><a href='#'>챔피언공략</a></li>
        </ul>
      </div>
      <div className='cmnt_box'>
      <div className='writing_btn'>
        <select>
          <option>전체</option>
          <option>자유</option>
          <option>질문,답변</option>
          <option>챔피언공략</option>
        </select>
          <Link to="/Writing" className='writing'>글작성</Link>
      </div>
    <table className='cmnt_table'>
        <caption className='blind'>커뮤니티</caption>
        <colgroup>
          <col className='number' />
          <col className='title' />
          <col className='user' />
          <col className='date' />
          <col className='rmd' />
        </colgroup>
        <thead>
          <tr>
            <th scope='col'>번호</th>
            <th scope='col'>제목</th>
            <th scope='col'>작성자</th>
            <th scope='col'>등록일</th>
            <th scope='col'>추천</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href='#'>1</a></td>
            <td><a href='#'>sunhongod</a></td>
            <td><a href='#'>김뿌농</a></td>
            <td><a href='#'>2022.01.06</a></td>
            <td><a href='#'>999</a></td>
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
      <form className='cmnt_form'>
        <fieldset>
          <legend className='blind'>커뮤니티 검색창</legend>
          <div className='cmnt_input'>
            <select>
              <option value="all">전체</option>
              <option value="title">제목</option>
              <option value="writer">작성자</option>
              <option value="contents">내용</option>
              <option value="title_contents">제목+내용</option>
            </select>
            <input type="search"  placeholder='검색어를 입력하세요' className='cmnt_search' title='검색' />
            <button type='submit'><FaSearch / ></button>
          </div>
        </fieldset>
      </form>
    </div>
    </main>
    </>
  )
}

export default Community;