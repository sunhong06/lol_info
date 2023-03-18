import React from 'react'
import '../../scss/Community/CommunitySearch.scss'
import {FaSearch} from 'react-icons/fa';

function CommunitySearch() {
  return (
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
        <button type='submit'><FaSearch /></button>
      </div>
    </fieldset>
  </form>
  )
}

export default CommunitySearch;
