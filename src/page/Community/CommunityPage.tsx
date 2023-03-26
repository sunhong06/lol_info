import React,{useState,useEffect} from 'react'

function CommunityPage({limit,page,setPage,totalBoard}:any) {
  const numPages = Math.ceil(totalBoard/limit)
  const [currPage, setCurrPage] = useState(page)
  const [btnActive, setBtnActive] = useState<number>(1);
  const firstNum = currPage - (currPage % 5) + 1
  const lastNum = currPage - (currPage % 5) + 5


  return (
    <div className='paging'>
    <button onClick={(e:any) => {setPage(page-1);setCurrPage(page-2);setBtnActive(page-1); }} disabled={page===1}> &lt; </button>
    <button 
    className={"btn" + (firstNum == Number(btnActive) ? " active" : "")}
        onClick={(e:any) => {setPage(firstNum);setBtnActive(e.target.innerHTML);}}
        aria-current={page === firstNum ? "page" : undefined}>
        {firstNum}
    </button>
    {Array(4).fill(null).map((_, i) =>{
        if(i <=2){
            return (
                <button
                    key={i+1} 
                    className={"btn" + (firstNum+1+i == Number(btnActive) ? " active" : "")}
                    onClick={(e:any) => {setPage(firstNum+1+i); setBtnActive(e.target.innerHTML);}}
                    aria-current={page === firstNum+1+i ? "page" : undefined}>
                    {firstNum+1+i}
                </button>
            )
        }
        else if(i>=3){
            return (
                <button
                 className={"btn" + (lastNum == Number(btnActive) ? " active" : "")}
                    key ={i+1}
                    onClick={(e:any) => {setPage(lastNum); setBtnActive((e.target.innerHTML));}}
                    aria-current={page === lastNum ? "page" : undefined}>
                    {lastNum}
                </button>
            )  
        }
    })}
    <button onClick={(e:any) => {setPage(page+1); setCurrPage(page);setBtnActive(page+1);}} disabled={page === numPages}> &gt; </button>
    </div>
  )
}

export default CommunityPage;
