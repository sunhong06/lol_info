import React from "react";
import { summonerInfoType } from "../../../type/rank";

interface RankingOneyDataProps {
  ranking: summonerInfoType;
  rankLength: number[];
  index: number;
}

function RankingOneData({ index, ranking, rankLength }: RankingOneyDataProps) {
  return (
    <tr>
      <td>{ranking.rank}</td>
      <td>{ranking.summonerName}</td>
      <td>
        {ranking.rank <= rankLength[0]
          ? "CHALLENGER"
          : ranking.rank <= rankLength[1] + rankLength[0]
          ? "GRANDMASTER"
          : ranking.rank <= rankLength[2] && "MASTER"}
      </td>
      <td>{ranking.leaguePoints} LP</td>
      <td>
        {ranking.wins}W {ranking.losses}L (
        <span className="Odds">
          {Math.round((ranking.wins / (ranking.wins + ranking.losses)) * 100)}%
        </span>
        )
      </td>
    </tr>
  );
}

export default RankingOneData;
