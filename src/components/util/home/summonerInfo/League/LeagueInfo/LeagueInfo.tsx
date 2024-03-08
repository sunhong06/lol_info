import React from "react";
import "../../../../../../scss/Home/SummonerInfo/LeagueInfo.scss";
import { useSelector } from "react-redux";
import { League } from "../../../../../../type/type";
import UnRanked from "../unRanked/UnRanked";
import RankData from "../RankData/RankData";

function LeagueInfo() {
  const LeagueDataSeletor = useSelector(
    (state: any) => state.summonerData.LeagueDataArray
  );
  return (
    <>
      <div className="rank_box">
        {LeagueDataSeletor.map((leagueData: any, index: number) =>
          leagueData[1] ? (
            <RankData key={index} leagueData={leagueData} ranked={1} />
          ) : (
            <UnRanked key={index} leagueData={leagueData} />
          )
        )}
        {LeagueDataSeletor.map((leagueData: League[0], index: number) =>
          leagueData[0] ? (
            <RankData key={index} leagueData={leagueData} ranked={0} />
          ) : (
            <UnRanked key={index} leagueData={leagueData} />
          )
        )}
      </div>
    </>
  );
}

export default LeagueInfo;
