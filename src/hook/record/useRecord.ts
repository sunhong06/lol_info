import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asiaLolAxios, lolAxios } from "../../axios/axios";
import axios, { Canceler } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function useRecord() {
  const dispatch = useDispatch();
  const [loding, setLoding] = useState(true);
  const [startingNum, setStartingNum] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const summonerName = location.state;
  //매치정보
  const matchInfoSelector = useSelector(
    (state: any) => state.summonerData.recordArray
  );
  //소환사데이터
  const summonerDataSeletor = useSelector(
    (state: any) => state.summonerData.summonerDataArray
  );

  // Promise
  // 첫 번째 API를 호출하고, 해당 API의 응답을 Promise로 반환 받습니다. 이후, Promise Chaining을 사용하여
  // 첫 번째 API의 응답 값을 파라미터로 다음 API를 호출합니다.
  let cancel: Canceler;

  const getSummonerData = async (summonerName: string) => {
    // 소환사 정보API
    try {
      const res = await lolAxios.get(
        `summoner/v4/summoners/by-name/${summonerName}`,
        { cancelToken: new axios.CancelToken((c) => (cancel = c)) }
      );
      dispatch({ type: "summonerDataReducer/summoner", payload: res.data });
      const SummonerId = res.data.id;
      const Summonerpuuid = res.data.puuid;
      // 소환사 리그정보API
      summonerMatchData(Summonerpuuid);
      // 소환사 매치데이터API
      summonerLeagueInfo(SummonerId);
    } catch (error: any) {
      // 소환사 정보가 없을때
      if (error.response.status == 404) {
        setLoding(false);
        return dispatch({
          type: "summonerDataReducer/summoner",
          payload: { error: "소환사의 정보가 없습니다. 다시 검색해주세요." },
        });
      }
    }
  };

  // 소환사 매치데이터
  const summonerLeagueInfo = async (SummonerId: number) => {
    const res1 = await lolAxios.get(
      `/league/v4/entries/by-summoner/${SummonerId}`
    );
    dispatch({ type: "summonerDataReducer/LeagueData", payload: res1.data });
  };

  // 소환사 리그정보
  const summonerMatchData = async (Summonerpuuid: string) => {
    const res2 = await asiaLolAxios.get(
      `match/v5/matches/by-puuid/${Summonerpuuid}/ids?start=${startingNum}&count=20&`
    );
    const league = res2.data;
    dispatch({ type: "summonerDataReducer/MacthInfo", payload: res2.data });
    setStartingNum(startingNum + 20);
    // 소환사 매치정보API
    summonerMatchInfo(league);
  };

  //소환사 매치정보
  const summonerMatchInfo = async (league: string[]) => {
    for (const res2Data of league) {
      const res3 = await asiaLolAxios.get(`match/v5/matches/${res2Data}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      });
      try {
        dispatch({ type: "summonerDataReducer/MatchData", payload: res3.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return navigate("/");
        } else {
          console.log(error);
        }
      }
    }
    setLoding(false);
  };

  const onDetail = (e: any) => {
    const detail = e.target.parentElement.nextElementSibling;
    if (detail.style.display == "none") {
      detail.style.display = "block";
    } else {
      detail.style.display = "none";
    }
  };

  const handleClickMore = () => {
    // 소환사 매치데이터 더보기
    summonerMatchData(summonerDataSeletor[0].puuid);
  };

  const handleClickSummonerName = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 같이 한 플레이어 정보 클릭시
    // recordinfo컴포넌트에 각 유저이름정보를 가져와서 api를 불러와야함
    const innerText = e.currentTarget.innerText;
    getSummonerData(innerText);
    setStartingNum(0);
    dispatch({ type: "summonerDataReducer/ResetComponent" });
  };

  return {
    onDetail,
    handleClickSummonerName,
    handleClickMore,
    summonerMatchInfo,
    summonerMatchData,
    summonerLeagueInfo,
    getSummonerData,
    summonerName,
  };
}

export default useRecord;
