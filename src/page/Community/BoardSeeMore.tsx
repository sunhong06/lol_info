import React,{ useState,useEffect } from 'react'
import {RiThumbUpFill} from "react-icons/ri"
import {FaComment} from 'react-icons/fa'
import Header from '../../components/Header';
import '../../scss/Community/BoardSeeMore.scss';
import { updateDoc,doc, increment,addDoc ,collection,onSnapshot,getDocs,query,orderBy  } from "firebase/firestore";
import {db} from '../../fbase'
import Category from './Category';
import { useLocation,Link } from 'react-router-dom';
import Comment from './Comment';

function BoardSeeMore() {
    const [up,setUp] = useState(0);
    const [lookup,setLookUp] = useState<any>(0);
    const [comment,setComment] = useState("")
    const [commentList,setCommentList] = useState<any>([])
    const location = useLocation();
    const board = location.state.board
    const name = location.state.nickname

    const HandleRecommendation = async() =>{
        const onRef = doc(db, "Board", board.id);
        await updateDoc(onRef, {
            up: increment(+1)
        });
        onRecommendation();
    }
    const onRecommendation = () =>{
        onSnapshot(doc(db,"Board", board.id), (doc)=>{
            return setLookUp(doc.data());
        })
    }

    const handleCommentClick = async(e:any) => {
        e.preventDefault();
        await addDoc(collection(db, "Comment"), {
            comment:comment,
            createAt:Date.now(),
            createId:board.id
          });
          setComment("")
          CommentLists();
    }
    
    const CommentLists = async() =>{
        const cmtRef = collection(db,"Comment");
        const querySnapshot = await getDocs(query(cmtRef, orderBy("createAt", "desc")));
        const newArray:any = [];
        querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(), id:doc.id});
        });
        setCommentList(newArray);
    }

      useEffect(()=>{
        onRecommendation();
        CommentLists();
      },[])
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
            <p className='options'>[{board.option}]</p>
            <p className='text'>{board.detail}</p>
            <div className='recommendation'>
                <button title='공감하기' onClick={HandleRecommendation} className='up'><RiThumbUpFill />{lookup.up}</button>
            </div>
            <div className='click_bar'>
                <button><Link to='/Community'>목록</Link></button>  
            </div>
        </div>
        <div className='comment_box'>
            <h3 className='comment_title'><FaComment />댓글</h3>
                <form className='comment_form' onSubmit={handleCommentClick}>
                    <fieldset>
                        <legend className='blind'>댓글창</legend>
                        <label htmlFor='comment_bar' className='blind'>작성자</label>
                        <input id='comment_bar' onChange={(e)=> setComment(e.target.value)} value={comment} type="text"   placeholder='댓글을 입력하세요' />
                        <input type="submit" value="등록" />
                    </fieldset>
                </form>
        </div>
        <ul className='comment_list'>
            <>
            {commentList.map((comment:any)=>(
                <Comment comment={comment} />
            ))}
            </>
        </ul>
    </div>
    </main>
    </>
  )
}

export default BoardSeeMore;
