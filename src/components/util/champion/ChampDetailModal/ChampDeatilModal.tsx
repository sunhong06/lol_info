import React, { useRef } from "react";
import useOnclickOutside from "../../../../hook/useOnclickOutside";
import "../../../../scss/Champion/ChampDetail.scss";
import { useSelector } from "react-redux";
import { ChampionInfoType } from "../../../../type/type";
import ChampionSkin from "../ChampionSkin/ChampionSkin";
import ChampionSkills from "../ChampionSkills/ChampionSkills";
import ChampionInfo from "../ChampionInfo/ChampionInfo";
import useChampionDetail from "../../../../hook/champion/useChampionDetail";

function ChampDetailModal({ setDetail }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const championSelector = useSelector(
    (state: any) => state.summonerData.ChampArray
  );
  const { onClose, HeadlesideClick, notImg } = useChampionDetail({ setDetail });

  useOnclickOutside(ref, HeadlesideClick);

  return (
    <div className="presentation">
      <div className="wrapper_Detail">
        <div className="Detail" ref={ref}>
          <span className="Detail_close" onClick={onClose}>
            X
          </span>
          {championSelector.map((info: ChampionInfoType) => (
            <>
              <ChampionInfo info={info} />
              <ChampionSkills info={info} />
              <ChampionSkin info={info} notImg={notImg} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChampDetailModal;
