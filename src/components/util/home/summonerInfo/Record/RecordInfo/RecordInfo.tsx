import React, { useState } from "react";
import {
  Participants,
  match,
  mySummonerDataType,
} from "../../../../../../type/type";
import { FiChevronDown } from "react-icons/fi";
import "../../../../../../scss/Home/SummonerInfo/RecordInfo.scss";
import RecordInfoDetail from "../RecordInfoDetail/RecordInfoDetail";
import TeamSummonerList from "../TeamSummonerList/TeamSummonerList";
import GameInfo from "../GameInfo/GameInfo";
import MyInfo from "../MyInfo/MyInfo";
import RecordMore from "../RecordMore/RecordMore";
import useRecord from "../../../../../../hook/record/useRecord";
import { v4 as uuidv4 } from "uuid";

interface RecordInfoProps {
  startingNum: number;
  summonerDataSeletor: mySummonerDataType[0];
  matchinfoSelector: match[];
}

function RecordInfo({
  startingNum,
  summonerDataSeletor,
  matchinfoSelector,
}: RecordInfoProps) {
  const [more, setMore] = useState<any>(null);
  const onDetail = (id: number) => {
    setMore((prev: any) => (prev === id ? null : id));
  };
  const { handleClickSummonerName, handleClickMore } = useRecord();

  return (
    <>
      <ul className="record">
        {matchinfoSelector.map((m: match) => (
          <>
            {m.info.participants.map(
              (p: Participants) =>
                p.summonerName == summonerDataSeletor[0].name && (
                  <li className={p.win ? "record_list" : "record_list_lose"}>
                    <GameInfo key={uuidv4()} m={m} p={p} />
                    <MyInfo key={uuidv4()} m={m} p={p} />
                    <TeamSummonerList
                      key={uuidv4()}
                      m={m}
                      handleClickSummonerName={handleClickSummonerName}
                    />
                    <button
                      onClick={() => onDetail(p.damageDealtToTurrets)}
                      className="ditails"
                    >
                      <FiChevronDown />
                    </button>
                    {more === p.damageDealtToTurrets && (
                      <RecordInfoDetail
                        key={uuidv4()}
                        handleClickSummonerName={handleClickSummonerName}
                        m={m}
                        summonerDataSeletor={summonerDataSeletor}
                      />
                    )}
                  </li>
                )
            )}
          </>
        ))}
        {/*   100개의 전적 이후에는 받아오는 값이 없음 */}
        <RecordMore
          startingNum={startingNum}
          handleClickMore={handleClickMore}
        />
      </ul>
    </>
  );
}

export default RecordInfo;
