import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function useRankData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickSummonerName = (summonerName: string) => {
    // 같이 한 플레이어 정보 클릭시
    // recordinfo컴포넌트에 각 유저이름정보를 가져와서 api를 불러와야함
    navigate(`/SummonerInfo/${summonerName}`, { state: summonerName });
    dispatch({ type: "summonerDataReducer/ResetComponent" });
  };
  return { handleClickSummonerName };
}

export default useRankData;
