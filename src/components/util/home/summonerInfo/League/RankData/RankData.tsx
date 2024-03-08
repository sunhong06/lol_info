import React from "react";
import { League } from "../../../../../../type/type";

interface RankDataProps {
  leagueData: League[0];
  ranked: number;
}
function RankData({ leagueData, ranked }: RankDataProps) {
  const SOLO_RAMK = "RANKED_SOLO_5x5";
  return (
    <div key={leagueData[ranked]?.leagueId} className="rank_data">
      <h2>
        {leagueData[ranked]?.queueType === SOLO_RAMK ? "개인" : "자유"}
        랭크
      </h2>
      <div className="rank_info">
        <img
          src={`../imgs/${leagueData[ranked]?.tier}.png`}
          alt={leagueData[ranked]?.tier}
          className="tier_img"
        />
        <ul className="rank_info_list">
          <li>
            티어 {leagueData[ranked]?.tier} {leagueData[ranked]?.rank}
          </li>
          <li>
            승률 <span className="wins">{leagueData[ranked]?.wins}W</span>
            <span className="loses">{leagueData[ranked]?.losses}L</span>
            <span className="win_rate">
              {Math.round(
                (leagueData[ranked]?.wins /
                  (leagueData[ranked]?.wins + leagueData[ranked]?.losses)) *
                  100
              )}
              %
            </span>
          </li>
          <li>포인트 {leagueData[ranked]?.leaguePoints}LP </li>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(RankData);
