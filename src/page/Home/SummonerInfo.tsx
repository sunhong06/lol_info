import React, { useEffect, useState } from "react";
import LeagueInfo from "../../components/util/home/summonerInfo/League/LeagueInfo/LeagueInfo";
import "../../scss/Home/SummonerInfo/summonerInfo.scss";
import RecordInfo from "../../components/util/home/summonerInfo/Record/RecordInfo/RecordInfo";
import { asiaLolAxios, lolAxios } from "../../axios/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios, { Canceler } from "axios";
import { summoner } from "../../type/type";
import Loading from "../../components/loading/Loading";
import { v4 as uuidv4 } from "uuid";

function SummonerInfo() {
  const [loding, setLoding] = useState(true);
  const [startingNum, setStartingNum] = useState(0);
  const dispatch = useDispatch<any>();
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

  useEffect(() => {
    getSummonerData(summonerName);
    // 뒤로가기했을때 같은값이 중복되서 계속 쌓이는걸 방지해서 초기화
    // 컴포넌트가 언마운트(unmount) 될 때, 불필요한 API 요청을 취소
    return () => {
      dispatch({ type: "summonerDataReducer/ResetComponent" }), cancel();
    };
  }, [dispatch]);

  return (
    <>
      <main className="summoner_main">
        <div className="summoner_main_inner">
          {loding ? (
            <Loading />
          ) : (
            summonerDataSeletor.map((s: summoner) =>
              s.name ? (
                <div key={s.id}>
                  <div className="summoner_info">
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/12.20.1/img/profileicon/${s.profileIconId}.png`}
                      className="profile_icon"
                    />
                    <h2 className="summoner_id">{s.name}</h2>
                    <span className="summoner_level">{s.summonerLevel}</span>
                  </div>
                  <div className="lol_info">
                    <LeagueInfo key={uuidv4()} />
                    <RecordInfo
                      key={uuidv4()}
                      startingNum={startingNum}
                      summonerDataSeletor={summonerDataSeletor}
                      matchinfoSelector={matchInfoSelector}
                    />
                  </div>
                </div>
              ) : (
                <div key={s.id}>
                  <p>{summonerDataSeletor[0].error}</p>
                </div>
              )
            )
          )}
        </div>
      </main>
    </>
  );
}

export default React.memo(SummonerInfo);
