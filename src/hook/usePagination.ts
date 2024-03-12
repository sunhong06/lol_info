import React, { useState } from "react";

function usePagination({ rankedData, itemsPerPage }: any) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItemResult = rankedData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(rankedData.length / itemsPerPage);

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * itemsPerPage) % rankedData.length;

    setItemOffset(newOffset);
  };

  return {
    handlePageClick,
    currentItemResult,
    pageCount,
  };
}
export default usePagination;
