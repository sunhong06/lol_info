import React, { useState } from "react";

function usePagination({ item, itemsPerPage }: any) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItemResult = item.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(item.length / itemsPerPage);

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * itemsPerPage) % item.length;

    setItemOffset(newOffset);
  };

  return {
    handlePageClick,
    currentItemResult,
    pageCount,
  };
}
export default usePagination;
