import React,{useState} from 'react'
import '../../scss/Community/CommunityPage.scss'

function CommunityPage({boardList,setCurrentPage,searchResult,itemsPerPage}:any) {
const [activeClick,setActiveClick] = useState(1);

  const handlePageClick = (e:any) => {
    setActiveClick(e.target.id)
    setCurrentPage(Number(e.target.id))
  };
  const HandlePrevClick = () => {
    // 현재 페이지 번호가 1이면 더 이상 이전 페이지가 없으므로 함수를 종료
    if (activeClick === 1) return;

    // 이전 페이지로 이동하고 현재 페이지 번호를 업데이트
    const prevPage = Number(activeClick) - 1;
    setActiveClick(prevPage);
    setCurrentPage(prevPage);
  };
      
  const HandleNextClick = () => {
    // 현재 페이지 번호가 마지막 페이지이면 더 이상 다음 페이지가 없으므로 함수를 종료
    if (activeClick === Math.ceil((searchResult.length == 0 ? (boardList.length) : (searchResult.length)))) return;
    
    // 다음 페이지로 이동하고 현재 페이지 번호를 업데이트
    const nextPage = Number(activeClick) + 1;
    setActiveClick(nextPage);
    setCurrentPage(nextPage);
  };

// 현재 보여질 페이지 범위를 계산
const activePageRange = {
start: Math.floor((Number(activeClick) - 1) / 10) * 10,
end: Math.floor((Number(activeClick) - 1) / 10) * 10 + 9,
}


  // 페이지네이션 컴포넌트
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil((searchResult.length == 0 ? (boardList.length) : (searchResult.length)) / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const visiblePageNumbers = pageNumbers.slice(activePageRange.start, activePageRange.end + 1);

  const renderPageNumbers = visiblePageNumbers.map((number:any) => {
    return (
      <li className={Number(activeClick) == number ? "active" : ""} key={number} id={number} onClick={handlePageClick}>
        {number}
      </li>
    );
  });




  return (
    <div className='pages'>
      <ul>
       <li onClick={HandlePrevClick} ><button disabled={activeClick == 1 && true}>&#60;</button></li>
          {renderPageNumbers}
        <li onClick={HandleNextClick}><button disabled={activeClick == Math.ceil((searchResult.length == 0 ? (boardList.length) : (searchResult.length))) && true}>&#62;</button></li>
      </ul>
    </div>
  )
}

export default CommunityPage;
