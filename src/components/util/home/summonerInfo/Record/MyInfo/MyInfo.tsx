import React from "react";
import ChampionItemList from "./ChampionItemList/ChampionItemList";
import { Team, match, Participants } from "../../../../../../type/type";

interface MyInfoProps {
  m: match;
  p: Participants;
}

function MyInfo({ m, p }: MyInfoProps) {
  return (
    <div className="my_info">
      <div className="champ_info">
        <div className="champ_img">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`}
            alt={p.championName}
          />
          <span className="champ_level">{p.champLevel}</span>
        </div>
        <div className="k_d_a">
          <div className="kda">
            {p.kills} / <span className="deaths">{p.deaths}</span> / {p.assists}
          </div>
          <span
            className={
              Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5
                ? "kda_five"
                : Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4
                ? "kda_four"
                : Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3
                ? "kda_three"
                : Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3
                ? "kda_two"
                : undefined
            }
          >
            {((p.kills + p.assists) / p.deaths).toFixed(2)}
            <span className="kda_txt">평점</span>
          </span>
        </div>
        <div className="stats">
          킬관여
          {m.info.teams.map(
            (team: Team) =>
              team.teamId === p.teamId && (
                <div key={team.teamId} className="kill_invo">
                  {Math.round(
                    ((p.kills + p.assists) / team.objectives.champion.kills) *
                      100
                  )}
                  %
                </div>
              )
          )}
          <div className="ward">제어와드 {p.sightWardsBoughtInGame}</div>
          <div className="cs">CS {p.totalMinionsKilled}</div>
        </div>
      </div>
      <ChampionItemList p={p} />
    </div>
  );
}

export default React.memo(MyInfo);
