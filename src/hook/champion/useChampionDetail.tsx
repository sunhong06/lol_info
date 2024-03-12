import React from "react";
import { useDispatch } from "react-redux";

function useChampionDetail({ setDetail }: any) {
  const dispatch = useDispatch();

  // x버튼 클릭시 닫음
  const onClose = () => {
    dispatch({ type: "summonerDataReducer/ChampionsRemove" });
    setDetail(false);
  };

  // 없는 스킨은 빈값
  const notImg = (e: React.BaseSyntheticEvent) => {
    e.target.parentNode.outerHTML = "";
  };

  // 디테일 화면 밖 클릭 시 창 닫음
  const HeadlesideClick = () => {
    onClose();
  };

  return {
    notImg,
    HeadlesideClick,
    onClose,
  };
}

export default useChampionDetail;
