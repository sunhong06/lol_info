// import "../../../../scss/Community/CommunityPage.scss";
// import usePagination from "../../../../hook/usePagination";

// interface CommunityPageProps {
//   boardList: any;
//   searchResult: any;
//   itemsPerPage: number;
// }

// function CommunityPage({
//   boardList,
//   searchResult,
//   itemsPerPage,
// }: CommunityPageProps) {
//   const {
//     activeClick,
//     handlePageClick,
//     HandlePrevClick,
//     HandleNextClick,
//     activePageRange,
//   } = usePagination({ boardList });
//   const pageNumbers = [];
//   for (
//     let i = 1;
//     i <=
//     Math.ceil(
//       (searchResult.length == 0 ? boardList.length : searchResult.length) /
//         itemsPerPage
//     );
//     i++
//   ) {
//     pageNumbers.push(i);
//   }

//   const visiblePageNumbers = pageNumbers.slice(
//     activePageRange.start,
//     activePageRange.end + 1
//   );

//   const renderPageNumbers = visiblePageNumbers.map((number: any) => {
//     return (
//       <li
//         className={Number(activeClick) == number ? "active" : ""}
//         key={number}
//         id={number}
//         onClick={handlePageClick}
//       >
//         {number}
//       </li>
//     );
//   });

//   return (
//     <div className="pages">
//       <ul>
//         <li onClick={HandlePrevClick}>
//           <button disabled={activeClick == 1 && true}>&#60;</button>
//         </li>
//         {renderPageNumbers}
//         <li onClick={HandleNextClick}>
//           <button
//             disabled={
//               activeClick ==
//                 Math.ceil(
//                   searchResult.length == 0
//                     ? boardList.length
//                     : searchResult.length
//                 ) && true
//             }
//           >
//             &#62;
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default CommunityPage;
export {};
