import React from "react";
import { summonerInfoType } from "../../../type/rank";

interface RankingArrayDataProps {
  ranking: summonerInfoType;
  rankLength: number[];
  index: number;
  handleClickSummonerName: (ranking: string) => void;
}

function RankingArrayData({
  index,
  ranking,
  rankLength,
  handleClickSummonerName,
}: RankingArrayDataProps) {
  return (
    <>
      <tr onClick={() => handleClickSummonerName(ranking.summonerName)}>
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
            {Math.round((ranking.wins / (ranking.wins + ranking.losses)) * 100)}
            %
          </span>
          )
        </td>
      </tr>
    </>
  );
}

export default React.memo(RankingArrayData);
