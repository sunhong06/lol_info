import React from "react";
import "../../../../scss/Champion/champion.scss";
import { useDispatch } from "react-redux";

function Champion({ champs, setDetail, search }: any) {
  const dispatch = useDispatch();

  const HandleClickChampInfo = (champ: any) => {
    dispatch({ type: "summonerDataReducer/ChampionData", payload: champ });
    setDetail(true);
  };

  return (
    <>
      {Object.entries(champs)
        .filter((champ: any) => {
          if (search == "") {
            return champ;
          } else if (
            champ[1].name.toLowerCase().includes(search.toLowerCase())
          ) {
            return champ;
          }
        })
        .map((champ: any) => (
          <li key={champ[1].key} className="champs">
            <button
              key={champ[1].key}
              onClick={() => HandleClickChampInfo(champ)}
            >
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/13.3.1/img/champion/${champ[1].image.full}`}
                alt={champ[1].id}
              />
            </button>
            <div className="champ_name">{champ[1].name}</div>
          </li>
        ))}
    </>
  );
}

export default Champion;
