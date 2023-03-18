import React from 'react'

function Comment({comment}:any) {
    const date = new Date(comment.createAt)
    

  return (  
    <>
    {comment.map((txt:any)=>{
            <ul className='comment_list'>
            <li>
                <span>{txt.name}</span>
                <span>{
                     date.getFullYear()+
                     "/"+(date.getMonth()+1)+
                     "/"+date.getDate()+
                     "."+date.getHours()+
                     "."+date.getMinutes()+
                     "."+date.getSeconds()
                    }</span>
                <p className='commemt_field'>{txt.comment}</p>
                <button type='button' className='remove'>삭제</button>
                <button type='button' className='reply'>답글</button>
                <p className='reply_field'></p>
            </li>
        </ul>
    })}
    </>
  )
}

export default Comment
