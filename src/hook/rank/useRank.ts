import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { lolAxios } from "../../axios/axios";

function useRank() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // 챌린져API
  const getCRankingData = async () => {
    const res = await lolAxios.get(
      `/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5`
    );
    try {
      dispatch({ type: "summonerDataReducer/RankDatas", payload: res.data });
    } catch (error) {
      console.log(error);
    }
    getGMRankingData();
  };

  // 그랜드마스터API
  const getGMRankingData = async () => {
    const res2 = await lolAxios.get(
      `/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5`
    );
    try {
      dispatch({ type: "summonerDataReducer/RankDatas", payload: res2.data });
    } catch (error: any) {
      console.log(error);
    }
    getMRankingData();
  };
  // 마스터API
  const getMRankingData = async () => {
    const res3 = await lolAxios.get(
      `/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5`
    );
    try {
      dispatch({ type: "summonerDataReducer/RankDatas", payload: res3.data });
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  return { getCRankingData, isLoading };
}

export default useRank;
