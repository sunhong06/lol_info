import React from "react";
import { ChampionInfoType } from "../../../../type/type";
import "../../../../scss/Champion/ChampionSkin.scss";

interface ChampionSkinProps {
  info: ChampionInfoType;
  notImg: (e: any) => void;
}

function ChampionSkin({ info, notImg }: ChampionSkinProps) {
  return (
    <>
      <h2>SKIN</h2>
      <ul className="champ_skins">
        {Array(14)
          .fill("")
          .map((_, idx: number) => (
            <li key={idx}>
              <img
                src={`${process.env.PUBLIC_URL}/imgs/loading/${info[0]}_${
                  idx + 1
                }.jpg`}
                alt={`${info[0]}_Skin`}
                onError={notImg}
              />
            </li>
          ))}
      </ul>
    </>
  );
}

export default ChampionSkin;
