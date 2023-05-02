import { addDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import {FaComment} from 'react-icons/fa'
import { db } from '../../fbase';
import Comment from './Comment';

function CommentInput({userObj,board,name}:any) {
    const [comment,setComment] = useState("");
    const [commentList,setCommentList] = useState<any>([]);

    const handleCommentClick = async(e:any) => {
        e.preventDefault();
        await addDoc(collection(db, "Comment"), {
            comment:comment,
            createAt:Date.now(),
            createId:board.id,
            user:userObj.email
          });
          setComment("")
          CommentLists();
    }
    
    const CommentLists = async() =>{
        const cmtRef = collection(db,"Comment");
        const querySnapshot = await getDocs(query(cmtRef, orderBy("createAt", "desc")));
        const newArray:any = [];
        querySnapshot.forEach((doc: { data: () => any; id: any; }) => {
          newArray.push({...doc.data(), id:doc.id});
        });
        setCommentList(newArray);
    }
    useEffect(()=>{
        CommentLists();
    },[])
    
  return (
    <>
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
        board.id == comment.createId &&
        <Comment userObj={userObj} name={name} comment={comment} key={comment.id} />
        ))}
        </>
    </ul>
    </>
  )
}

export default CommentInput;
