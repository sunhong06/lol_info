import React from 'react'
import Header from '../../components/Header';
import '../../scss/Community/BoardSeeMore.scss';
import { useLocation,Link, useNavigate } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommunityRecommendation from './CommunityRecommendation';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../fbase';

function BoardSeeMore({userObj}:any) {
    const navigate = useNavigate();
    const location = useLocation();
    const board = location.state.board;
    const name = location.state.name;
    const handleRemoveBoardClick = async() =>{
        const ok = window.confirm("삭제하시겠습니까?")
      if(ok){
        await deleteDoc(doc(db, "Board", board.id));
        }
        navigate('/Community')
        window.location.reload();
    }

  return (
    <>
    <Header />
    <main className='board_main'>
    <h2 className='blind'>글작성</h2>
    <div className='board_box'>
        <p className='article_info'>
            <span><span className='sub'>작성자</span> {name}</span>
            <span><span className='sub'>제목</span> {board.title}</span>
            <span><span className='sub'>조회수</span> {board.view}</span>
        </p>
        <div className='content_field'>
            <p className='options'>[{board.option}]</p>
            <p className='text'>{board.detail}</p>
                <CommunityRecommendation board={board} />
            <div className='click_bar'>
                <button><Link to='/Community'>목록</Link></button>  
            {userObj && userObj.email == name && <button onClick={handleRemoveBoardClick}>삭제</button>}
            </div>
        </div>
        <CommentInput userObj={userObj} name={name} board={board} />
    </div>
    </main>
    </>
  )
}

export default BoardSeeMore;
