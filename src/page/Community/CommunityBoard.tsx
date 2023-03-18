import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../../scss/Community/CommunityBoard.scss'
import { doc, increment, updateDoc } from "firebase/firestore";
import {db} from '../../fbase'
function CommunityBoard({board,num,nickname}:any) {
  const [view,setView] = useState(0);
  const date = new Date(board.createAt)

  const views = async()=> {
    setView(prev => prev+1)
    const viewRef = doc(db, "Board" , board.id);
    await updateDoc(viewRef, {
      view: increment(view)
    });
  }
  useEffect(()=>{
    views();
  },[])

  return (
    <tr className='board' key={board.id} onClick={views}>
    <td><Link to="/BoardSeeMore" state={{board,nickname}}>{num}</Link></td>
    <td><Link to="/BoardSeeMore" state={{board,nickname}}>{board.title}</Link></td>
    <td><Link to="/BoardSeeMore" state={{board,nickname}}>{nickname}</Link></td>
    <td><Link to="/BoardSeeMore" state={{board,nickname}}>{
              date.getFullYear()+
          "/"+(date.getMonth()+1)+
          "/"+date.getDate()}</Link></td>
    <td><Link to="/BoardSeeMore" state={{board,nickname}}>{board.up}</Link></td>
    </tr>
  )
}

export default CommunityBoard;
