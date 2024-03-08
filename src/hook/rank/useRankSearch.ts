import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

function useRankSearch() {
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();

  // 구글 검색API를 이용해서 검색기능구현
  const onHandleSearchClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setSearch(e.currentTarget.value);
    if (search.length > 0) {
      const res = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${"AIzaSyDbi2BT9z4z4jQ0j0TTHgxzUzlx9QjnE10"}&cx=${"a3220d481370c47da"}&q=${search}`
      );
      try {
        dispatch({ type: "summonerDataReducer/RankSearch", payload: res.data });
      } catch {
        dispatch({ type: "summonerDataReducer/RankSearch", payload: null });
      }
    }
    setSearch("");
  };
  return {
    onHandleSearchClick,
    search,
    setSearch,
  };
}

export default useRankSearch;
