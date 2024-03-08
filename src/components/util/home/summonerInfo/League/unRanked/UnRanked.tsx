import React from "react";
import { League } from "../../../../../../type/type";

interface UnRankedProps {
  leagueData: League[0];
}
function UnRanked({ leagueData }: UnRankedProps) {
  return (
    <div className="rank_data">
      <h2>
        {leagueData[0].queueType == "RANKED_SOLO_5x5" ? "개인" : "자유"}
        랭크<span className="unranked">Unranked</span>
      </h2>
    </div>
  );
}

export default UnRanked;
