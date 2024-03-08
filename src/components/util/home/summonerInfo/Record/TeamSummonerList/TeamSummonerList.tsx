import React from "react";
import { Link } from "react-router-dom";
import { Participants, match } from "../../../../../../type/type";

interface TeamSummonerListProps {
  m: match;
  handleClickSummonerName: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function TeamSummonerList({
  m,
  handleClickSummonerName,
}: TeamSummonerListProps) {
  return (
    <div className="summoners">
      <ul>
        {m.info.participants.map((p: Participants, index: number) =>
          index > 4 ? (
            <li key={index}>
              <Link
                to={`/SummonerInfo/${p.summonerName}`}
                onClick={handleClickSummonerName}
                className="smr_link"
              >
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`}
                  alt={p.championName}
                />
                {p.summonerName}
              </Link>
            </li>
          ) : undefined
        )}
      </ul>
      <ul>
        {m.info.participants.map((p: Participants, index: number) =>
          index < 5 ? (
            <li key={index}>
              <Link
                to={`/SummonerInfo/${p.summonerName}`}
                onClick={handleClickSummonerName}
                className="smr_link"
              >
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`}
                  alt={p.championName}
                />
                {p.summonerName}
              </Link>
            </li>
          ) : undefined
        )}
      </ul>
    </div>
  );
}

export default React.memo(TeamSummonerList);
