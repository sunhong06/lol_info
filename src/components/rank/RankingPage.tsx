// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../../scss/Ranking/RankingPage.scss";
// import usePagination from "../../hook/usePagination";

// function RankingPage({
//   rankSearchedSeletor,
//   setCurrentPage,
//   highRankingDataSort,
//   itemsPerPage,
//   currentPage,
// }: any) {
//   const {
//     HandleNextClick,
//     handlePageClick,
//     HandlePrevClick,
//     activeClick,
//     activePageRange,
//   } = usePagination({
//     highRankingDataSort,
//     setCurrentPage,
//     currentPage,
//     itemsPerPage,
//   });
//   const navigate = useNavigate();
//   const page = useParams<any>();
//   console.log(page);
//   useEffect(() => {
//     navigate(`/Ranking`);
//   }, [currentPage]);

//   const pageNumbers = [];
//   for (
//     let i = 1;
//     i <= Math.ceil(highRankingDataSort?.length / itemsPerPage);
//     i++
//   ) {
//     pageNumbers.push(i);
//   }

//   const visiblePageNumbers = pageNumbers.slice(
//     activePageRange.start,
//     activePageRange.end + 1
//   );

//   const renderPageNumbers = visiblePageNumbers.map((number: number) => {
//     return (
//       <li
//         className={Number(activeClick) == number ? "active" : ""}
//         key={number}
//         id={String(number)}
//         onClick={handlePageClick}
//       >
//         {number}
//       </li>
//     );
//   });

//   return (
//     <div className="pages">
//       {rankSearchedSeletor ? undefined : (
//         <ul>
//           <li onClick={HandlePrevClick}>
//             <button disabled={activeClick == 1 && true}>&#60;</button>
//           </li>
//           {renderPageNumbers}
//           <li onClick={HandleNextClick}>
//             <button
//               disabled={
//                 activeClick ==
//                   Math.ceil(highRankingDataSort?.length / itemsPerPage) && true
//               }
//             >
//               &#62;
//             </button>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// }

// export default RankingPage;
export {};
