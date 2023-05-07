import React, { useState } from 'react'
import '../../scss/Community/comment.scss'
import { doc,deleteDoc, updateDoc } from "firebase/firestore";
import {db} from '../../fbase'

function Comment({userObj,name,comment}:any) {
    const [editComment,setEditComment] = useState("");
    const [editing,setEditing] = useState(false);
    const date = new Date(comment.createAt)
    const handleRemoveClick = async() =>{
      const ok = window.confirm("삭제하시겠습니까?")
      if(ok){
       await deleteDoc(doc(db, "Comment", comment.id));
        window.location.reload();
      }
    }

    const handleEditClick = () =>{
      setEditing(true)
    }
    const editCommentChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
      setEditComment(e.target.value)
    }
    // 수정완료 버튼 
    const handleCompleteClick = async() =>{
      const commentRef = doc(db, "Comment", comment.id);
      await updateDoc(commentRef, { comment:editComment })
      setEditComment("");
      setEditing(false)
      window.location.reload();
    }
  return (  
    <>
    <li>
      <span>{comment.user}</span>
      <span className='date'>{
        date.getFullYear()+
        "/"+(date.getMonth()+1)+
        "/"+date.getDate()+ 
        " "+date.getHours()+
        ":"+date.getMinutes()}
      </span>
      <p className='commemt_field'>{comment.comment}</p>
      {userObj &&
      comment.user == userObj.email && 
      <>
      <button type='button' onClick={handleRemoveClick} className='remove'>삭제</button>
      <button type='button' onClick={handleEditClick} className='edit'>수정</button>
      {editing && 
        <>
          <input type='text' value={editComment} onChange={editCommentChange} className='edit_Input' />
          <button type='button' onClick={handleCompleteClick}>확인</button>
        </>
        }
      </>
      }
      
    </li>
    </>
  )
}

export default Comment;
