import { doc, increment, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { RiThumbUpFill } from 'react-icons/ri';
import { db } from '../../fbase';
import { boards } from '../../type/type';

function CommunityRecommendation({board}:any) {
    const [lookup,setLookUp] = useState(board.up);

    const HandleRecommendation = async() =>{
        const onRef = doc(db, "Board", board.id);
        await updateDoc(onRef, {
            up: increment(+1)
        });
    }
    
    const onRecommendation = () =>{
        onSnapshot(doc(db,"Board", board.id), (doc)=>{
            return setLookUp(doc.data());
        })
    }

    useEffect(()=>{
    onRecommendation();
    },[])
    
  return (
    <div className='recommendation'>
        <button title='공감하기' onClick={HandleRecommendation} className='up'><RiThumbUpFill />{lookup.up}</button>
    </div>
  )
}

export default CommunityRecommendation;
