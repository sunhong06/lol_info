import React from 'react'
import {FaArrowDown,FaArrowUp,FaComment} from 'react-icons/fa'
import Header from '../../components/Header';
import '../../scss/Writing.scss';

function Writing() {
  return (
    <>
    <Header />
    <main className='writing_main'>
    <h2 className='blind'>글작성</h2>
    <div className='writing_category'>
        <ul>
          <li><a href='#'>전체</a></li>
          <li><a href='#'>자유</a></li>
          <li><a href='#'>질문,답변</a></li>
          <li><a href='#'>챔피언공략</a></li>
        </ul>
    </div>
    <div className='writing_box'>
        <p className='article_info'>
            <span>작성자</span>
            <span>제목</span>
            <span>조회수</span>
        </p>
        <div className='content_field'>
            <p className='options'>[카테고리]</p>
            <div className='recommendation'>
                <button><FaArrowUp /><span>UP</span></button>
                <button><FaArrowDown /><span>DOWN</span></button>
            </div>
            <div className='click_bar'>
                <button>목록</button>
                <button>댓글</button>
            </div>
        </div>
        <div className='comment_box'>
            <h3 className='comment_title'><FaComment />댓글</h3>
                <form className='comment_form'>
                    <fieldset>
                        <legend className='blind'>댓글창</legend>
                        <label htmlFor='comment_bar' className='blind'>작성자</label>
                        <input id='comment_bar' type="text"   placeholder='댓글을 입력하세요' />
                        <input type="submit" value="등록" />
                    </fieldset>
                </form>
                <ul className='comment_list'>
                    <li>
                        <span>sunhonggod</span>
                        <span>2022.02.02</span>
                        <p className='commemt_field'>댓글내용</p>
                        <button type='button' className='remove'>삭제</button>
                        <button type='button' className='reply'>답글</button>
                        <p className='reply_field'></p>
                    </li>
                </ul>
        </div>
    </div>
    </main>
    </>
  )
}

export default Writing;