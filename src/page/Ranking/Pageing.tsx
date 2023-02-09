import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation, createSearchParams } from 'react-router-dom';
import '../../scss/Pageing.scss';
import axios from "axios";
import { NOTFOUND } from 'dns';

function Pageing({page,limit,totalPosts,setPage,rank}:any) {
    const [currPage, setCurrPage] = useState(page)
    const location = useLocation();
	const numPages = Math.ceil(totalPosts/limit)
    const firstNum = currPage - (currPage % 10) + 1
	const lastNum = currPage - (currPage % 10) + 5
    console.log(lastNum);
    const navigate = useNavigate();
    const { pathname } = location; 
    
    useEffect(()=>{
        navigate({
            pathname: pathname,
            search: `?${createSearchParams({page: page})}`,
          });

    },[page])
  return (
    <div className='paging'>
        <button onClick={() => {setPage(page-1); setCurrPage(page-2);}} disabled={page===1}> &lt; </button>
        <button onClick={() => setPage(firstNum)}> {firstNum} </button>
                {Array(numPages).fill(undefined).map(( _ , i) =>{
                    if(i<9){
                        return (
                            <button  key={i+1+firstNum}   onClick={()=>{setPage(firstNum+1+i)}}  >
                                {firstNum+i+1}
                            </button>
                        )
                    }else if(i < numPages){
                        <button  key={i+1+lastNum}   onClick={()=>{setPage(lastNum)}}  >
                        {lastNum}
                        </button>
                    }
                })}
                <button onClick={() => {setPage(page+1);setCurrPage(page);}} disabled={page===numPages}> &gt; </button>
                </div>
  )
}

export default Pageing;