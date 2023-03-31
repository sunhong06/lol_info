import React from 'react'
import '../../scss/Community/comment.scss'
import { doc,deleteDoc } from "firebase/firestore";
import {db} from '../../fbase'

function Comment({comment}:any) {
    const date = new Date(comment.createAt)
    const handleRemoveClick = async() =>{
      const ok = window.confirm("삭제하시겠습니까?")
      if(ok){
        deleteDoc(doc(db, "Comment", comment.id));
        window.location.reload();
      }

    }
  return (  
    <>
            <li>
                <span>{comment.id}</span>
                <span className='date'>{
                     date.getFullYear()+
                     "/"+(date.getMonth()+1)+
                     "/"+date.getDate()+ 
                     " "+date.getHours()+
                     ":"+date.getMinutes()
                    }</span>
                <p className='commemt_field'>{comment.comment}</p>
                <button type='button' onClick={handleRemoveClick} className='remove'>삭제</button>
                <button type='button' className='reply'>답글</button>
                <p className='reply_field'></p>
            </li>
    </>
  )
}

export default Comment
