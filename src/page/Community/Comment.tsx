import React from 'react'
import '../../scss/Community/comment.scss'

function Comment({comment}:any) {
    const date = new Date(comment.createAt)
    console.log(comment)
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
                <button type='button' className='remove'>삭제</button>
                <button type='button' className='reply'>답글</button>
                <p className='reply_field'></p>
            </li>
    </>
  )
}

export default Comment
