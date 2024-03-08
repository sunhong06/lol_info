import {
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { db } from "../../fbase/fbase";
import { useDispatch, useSelector } from "react-redux";
import { boards } from "../../type/type";

function useCommunity() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [select, setSelect] = useState<string>("title");
  const [selected, setSelected] = useState();
  const [boardList, setBoardList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedResultSeletor = useSelector(
    (state: any) => state.summonerData.communitySearchArray
  );

  const headleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    // 카테고리 선택
    if (value == "title") {
      setSelect("title");
    } else if (value == "user") {
      setSelect("user");
    } else if (value == "detail") {
      setSelect("detail");
    }
  };

  const headleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm == "") {
      alert("검색어를 입력해주세요");
    } else {
      // 검색
      const BoardRef = collection(db, "Board");
      const q = query(
        BoardRef,
        where(select, ">=", searchTerm),
        where(select, "<=", searchTerm + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc: { id: any; data: () => any }) => {
        dispatch({
          type: "summonerDataReducer/CommunitySearched",
          payload: { id: doc.id, ...doc.data() },
        });
      });

      navigate({
        search: `?q=${createSearchParams({ search: searchTerm })}`,
      });
      if (querySnapshot.docs.length === 0) {
        alert("검색결과가없습니다.");
      }
      if (searchedResultSeletor.length > 0) {
        // 이전 검색값 삭제후 다시호출
        dispatch({ type: "summonerDataReducer/CommunityClearSearched" });
        querySnapshot.forEach((doc: { id: any; data: () => any }) => {
          dispatch({
            type: "summonerDataReducer/CommunitySearched",
            payload: { id: doc.id, ...doc.data() },
          });
        });
      }
      setSearchTerm("");
    }
  };

  // firebase를 통해 db에 게시글저장
  const Bring = async () => {
    try {
      const BoardRef = collection(db, "Board");
      const querySnapshot = await getDocs(
        query(BoardRef, orderBy("createAt", "desc"))
      );
      const newArray: any = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      setBoardList(newArray);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  // 카테고리에 맞게 게시글이 나눔
  const catagorys = (name: React.SetStateAction<undefined>) => {
    setSelected(name);
  };

  return {
    headleChangeSelect,
    handleSubmitSearch,
    headleChangeSearch,
    Bring,
    catagorys,
    selected,
    isSearch,
    boardList,
    searchTerm,
    isLoading,
    setIsLoading,
  };
}

export default useCommunity;
