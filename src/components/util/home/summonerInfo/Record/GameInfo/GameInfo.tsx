import React from "react";
import { Participants, match } from "../../../../../../type/type";

interface GameInfoProps {
  m: match;
  p: Participants;
}

function GameInfo({ m, p }: GameInfoProps) {
  return (
    <div className="game_info">
      <div className="date">
        {new Date(m.info.gameCreation).getFullYear() +
          "/" +
          (new Date(m.info.gameCreation).getMonth() + 1) +
          "/" +
          new Date(m.info.gameCreation).getDate()}
      </div>
      <div className="game_time">
        {Math.round(m.info.gameDuration / 60)}분{" "}
        {Math.round(m.info.gameDuration % 60)}초
      </div>
      <div className="game_type">
        {m.info.queueId === 450 && "무작위 총력전"}
        {m.info.queueId === 900 && "U.R.F"}
        {m.info.queueId === 420 && "솔랭"}
        {m.info.queueId === 430 && "일반"}
        {m.info.queueId === 440 && "자유 5:5랭크"}
      </div>
      <div className="game_result">
        {p.win ? (
          <span className="win">승리</span>
        ) : (
          <span className="lose">패배</span>
        )}
      </div>
    </div>
  );
}

export default GameInfo;
