import React from "react";
import { Link } from "react-router-dom";
import { Participants, Team, match } from "../../../../../../type/type";

interface TeamDetailProps {
  index: number;
  p: Participants;
  handleClickSummonerName: (e: any) => void;
  m: match;
}

function TeamDetail({ index, p, handleClickSummonerName, m }: TeamDetailProps) {
  return (
    <tr key={index} className={p.win ? "win" : "lose"}>
      <td className="s_name">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${p.championName}.png`}
          alt={p.championName}
        />
        <Link
          to={`/SummonerInfo/${p.summonerName}`}
          onClick={handleClickSummonerName}
        >
          {p.summonerName}
        </Link>
      </td>
      <td className="detail_kda">
        <span>
          {p.kills}/<span className="deaths">{p.deaths}</span>/{p.assists}(
          {m.info.teams.map(
            // eslint-disable-next-line no-undef
            (team: Team) =>
              team.teamId === p.teamId &&
              Math.round(
                ((p.kills + p.assists) / team.objectives.champion.kills) * 100
              )
          )}
          %)
        </span>
        <span
          className={
            Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 5
              ? "five"
              : Number(((p.kills + p.assists) / p.deaths).toFixed(2)) > 4
              ? "four"
              : Number(((p.kills + p.assists) / p.deaths).toFixed(2)) >= 3
              ? "three"
              : Number(((p.kills + p.assists) / p.deaths).toFixed(2)) < 3
              ? "two"
              : undefined
          }
        >
          {((p.kills + p.assists) / p.deaths).toFixed(2)}
        </span>
      </td>
      <td className="damage">{p.totalDamageDealtToChampions}</td>
      <td className="damage">{p.totalDamageTaken}</td>
      <td>{p.goldEarned}g</td>
      <td>{p.totalMinionsKilled}</td>
      <td>
        <ul className="item">
          <li>
            {p.item0 && (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item0}.png`}
                alt="item1"
              />
            )}
          </li>
          <li>
            {p.item1 && (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item1}.png`}
                alt="item2"
              />
            )}
          </li>
          <li>
            {p.item2 && (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item2}.png`}
                alt="item3"
              />
            )}
          </li>
          <li>
            {p.item3 && (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item3}.png`}
                alt="item4"
              />
            )}
          </li>
          <li>
            {p.item4 && (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item4}.png`}
                alt="item5"
              />
            )}
          </li>
          <li>
            {p.item5 && (
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item5}.png`}
                alt="item6"
              />
            )}
          </li>
        </ul>
      </td>
    </tr>
  );
}

export default React.memo(TeamDetail);
