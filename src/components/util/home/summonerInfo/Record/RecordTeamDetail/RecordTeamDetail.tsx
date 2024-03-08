import React from "react";
import {
  Participants,
  match,
  mySummonerDataType,
} from "../../../../../../type/type";
import TeamDetail from "./TeamDetail";

interface RecordTeamDetailProps {
  m: match;
  summonerDataSeletor: mySummonerDataType[0];
  handleClickSummonerName: (e: any) => void;
}

function RecordTeamDetail({
  m,
  summonerDataSeletor,
  handleClickSummonerName,
}: RecordTeamDetailProps) {
  return (
    <table>
      <colgroup>
        <col width="185" />
        <col width="100" />
        <col width="85" />
        <col width="85" />
        <col width="80" />
        <col width="40" />
      </colgroup>
      <caption>종합</caption>
      <thead>
        <tr>
          <th>
            {m.info.participants.map((p: Participants) =>
              p.summonerName == summonerDataSeletor[0].name
                ? p.win
                  ? "패배팀"
                  : "승리팀"
                : null
            )}
          </th>
          <th>KDA</th>
          <th colSpan={2}>피해량</th>
          <th>골드</th>
          <th>CS</th>
          <th>아이템</th>
        </tr>
      </thead>
      <tbody>
        {m.info.participants.map((p: Participants, index: number) =>
          index > 4 ? (
            <TeamDetail
              key={index}
              handleClickSummonerName={handleClickSummonerName}
              p={p}
              m={m}
              index={index}
            />
          ) : (
            index < 5 && (
              <TeamDetail
                key={index}
                handleClickSummonerName={handleClickSummonerName}
                p={p}
                m={m}
                index={index}
              />
            )
          )
        )}
      </tbody>
    </table>
  );
}

export default React.memo(RecordTeamDetail);
