import React from "react";
import { Participants } from "../../../../../../../type/type";
interface ChampionItemListProps {
  p: Participants;
}
function ChampionItemList({ p }: ChampionItemListProps) {
  return (
    <div className="items">
      <ul className="item">
        <li>
          {p.item0 ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item0}.png`}
              alt="item1"
            />
          ) : undefined}
        </li>
        <li>
          {p.item1 ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item1}.png`}
              alt="item2"
            />
          ) : undefined}
        </li>
        <li>
          {p.item2 ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item2}.png`}
              alt="item3"
            />
          ) : undefined}
        </li>
        <li>
          {p.item3 ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item3}.png`}
              alt="item4"
            />
          ) : undefined}
        </li>
        <li>
          {p.item4 ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item4}.png`}
              alt="item5"
            />
          ) : undefined}
        </li>
        <li>
          {p.item5 ? (
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${p.item5}.png`}
              alt="item6"
            />
          ) : undefined}
        </li>
      </ul>
      {p.pentaKills > 0 ? (
        <div className="max_kills">펜타킬</div>
      ) : p.quadraKills > 0 ? (
        <div className="max_kills">쿼드라킬</div>
      ) : p.tripleKills > 0 ? (
        <div className="max_kills">트리플킬</div>
      ) : p.doubleKills > 0 ? (
        <div className="max_kills">더블킬</div>
      ) : null}
    </div>
  );
}

export default React.memo(ChampionItemList);
