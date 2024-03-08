import React from "react";
import { ChampionInfoType } from "../../../../type/type";
interface ChampionInfoProps {
  info: ChampionInfoType;
}

function ChampionInfo({ info }: ChampionInfoProps) {
  return (
    <div key={info[1].key}>
      <img
        className="champ_img"
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info[0]}_0.jpg`}
        alt={info[0]}
      />
      <div className="champ_info">
        <span className="champ_name">{info[1].name},</span>
        <span className="champ_title">{info[1].title}</span>
        <div className="blurb">{info[1].blurb}</div>
      </div>
    </div>
  );
}

export default ChampionInfo;
