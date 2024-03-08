import React from "react";
import "../../../../scss/Community/CommunitySearch.scss";
import { FaSearch } from "react-icons/fa";
import useCommunity from "../../../../hook/community/useCommunity";

function CommunitySearch() {
  const {
    handleSubmitSearch,
    headleChangeSelect,
    searchTerm,
    headleChangeSearch,
  } = useCommunity();
  return (
    <form className="cmnt_form" onSubmit={handleSubmitSearch}>
      <fieldset>
        <legend className="blind">커뮤니티 검색창</legend>
        <div className="cmnt_input">
          <select onChange={headleChangeSelect}>
            <option value="title">제목</option>
            <option value="user">작성자</option>
            <option value="detail">내용</option>
          </select>
          <input
            type="search"
            value={searchTerm}
            placeholder="검색어를 입력하세요"
            onChange={headleChangeSearch}
            className="cmnt_search"
            title="검색"
          />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default CommunitySearch;
