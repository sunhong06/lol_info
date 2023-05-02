import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import '../../scss/Community/CommunityBoard.scss'
import { doc, increment, updateDoc } from "firebase/firestore";
import {db} from '../../fbase'
function CommunityBoard({board,num,name}:any) {
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
    <td><Link to={`/Community/${board.id}`} state={{board,name}}>{num}</Link></td>
    <td><Link to={`/Community/${board.id}`} state={{board,name}}>[{board.option}]  {board.title}</Link></td>
    <td><Link to={`/Community/${board.id}`} state={{board,name}}>{name}</Link></td>
    <td><Link to={`/Community/${board.id}`} state={{board,name}}>{
              date.getFullYear()+
          "/"+(date.getMonth()+1)+
          "/"+date.getDate()}</Link></td>
    <td><Link to={`/Community/${board.id}`} state={{board,name}}>{board.up}</Link></td>
    </tr>
  )
}

export default CommunityBoard;
