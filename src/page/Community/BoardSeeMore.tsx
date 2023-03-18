import React,{ useState,useEffect } from 'react'
import {RiThumbUpFill} from "react-icons/ri"
import {FaComment} from 'react-icons/fa'
import Header from '../../components/Header';
import '../../scss/Community/BoardSeeMore.scss';
import { updateDoc,doc, increment,addDoc ,collection,getDocs  } from "firebase/firestore";
import {db} from '../../fbase'
import Category from './Category';
import { useLocation } from 'react-router-dom';
import Comment from './Comment';

function BoardSeeMore() {
    const [up,setUp] = useState(0);
    const [comment,setComment] = useState("")
    const [commentList,setCommentList] = useState([])
    const location = useLocation();
    const board = location.state.board
    const name = location.state.nickname
    console.log(board)
    const onRecommendation = async() =>{
        setUp(prev=> prev+1)
        const onRef = doc(db, "Board", board.id);
        await updateDoc(onRef, {
            up: increment(up)
        }); 
    }
    // const handleCommentClick = async(e:any) => {
    //     e.preventDefault()
    //     await addDoc(collection(db, "Comment"), {
    //         comment:comment,
    //         createAt:Date.now(),
    //         createId:board.id,
    //         name:name
    //       });
    //       setComment("")
    // }
    // const CommentLists = async() =>{
    //     const querySnapshot = await getDocs(collection(db, "Comment"));
    //     const newArray:any = [];
    //     querySnapshot.forEach((doc) => {
    //       newArray.push({...doc.data(), id:doc.id});
    //     });
    //     setCommentList(newArray)
    //   }
  return (
    <>
    <Header />
    <main className='board_main'>
    <h2 className='blind'>글작성</h2>
    <Category />
    <div className='board_box'>
        <p className='article_info'>
            <span><span className='sub'>작성자</span> {name}</span>
            <span><span className='sub'>제목</span> {board.title}</span>
            <span><span className='sub'>조회수</span> {board.view}</span>
        </p>
        <div className='content_field'>
            <p className='options'>[카테고리]</p>
            <p className='text'>{board.detail}</p>
            <div className='recommendation'>
                <button title='공감하기' onClick={onRecommendation} className='up'><RiThumbUpFill />{board.up}</button>
            </div>
            <div className='click_bar'>
                <button>목록</button>
                <button>댓글</button>
            </div>
        </div>
        {/* <div className='comment_box'>
            <h3 className='comment_title'><FaComment />댓글</h3>
                <form className='comment_form' onSubmit={handleCommentClick}>
                    <fieldset>
                        <legend className='blind'>댓글창</legend>
                        <label htmlFor='comment_bar' className='blind'>작성자</label>
                        <input id='comment_bar' onChange={(e)=> setComment(e.target.value)} value={comment} type="text"   placeholder='댓글을 입력하세요' />
                        <input type="submit" value="등록" />
                    </fieldset>
                </form>
                 <Comment comment={commentList} />
        </div> */}
    </div>
    </main>
    </>
  )
}

export default BoardSeeMore;
