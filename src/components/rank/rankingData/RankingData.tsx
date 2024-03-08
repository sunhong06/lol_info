import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { rank } from "../../../type/type";
import { useDispatch } from "react-redux";
import { summonerInfoType } from "../../../type/rank";
import useRankData from "../../../hook/rank/useRankData";
import RankingArrayData from "./RankingArrayData";
import RankingOneData from "./RankingOneData";

interface RankingDataProps {
  rankSearchedSeletor: any;
  currentRankResult: summonerInfoType[];
  rankLength: number[];
}

function RankingData({
  rankSearchedSeletor,
  currentRankResult,
  rankLength,
}: RankingDataProps) {
  const { handleClickSummonerName } = useRankData();
  return (
    <>
      {currentRankResult.map((ranking: summonerInfoType, index: number) =>
        rankSearchedSeletor.length < 1 ? (
          <RankingArrayData
            handleClickSummonerName={handleClickSummonerName}
            ranking={ranking}
            key={index}
            index={index}
            rankLength={rankLength}
          />
        ) : (
          rankSearchedSeletor.queries.request[0].searchTerms ==
            ranking.summonerName && (
            <RankingOneData
              index={index}
              rankLength={rankLength}
              ranking={ranking}
            />
          )
        )
      )}
    </>
  );
}

export default React.memo(RankingData);
