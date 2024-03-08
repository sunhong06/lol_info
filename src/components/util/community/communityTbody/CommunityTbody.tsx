import React from "react";
import CommunityBoard from "../communityBoard/CommunityBoard";
import { boards } from "../../../../type/type";

interface CommunityTbodyProps {
  result: boards[];
  selected?: string;
}

function CommunityTbody({ result, selected }: CommunityTbodyProps) {
  return (
    <>
      {result
        .filter((board: boards) => {
          if (undefined === selected) {
            return board;
          } else if (board.option === selected) {
            return board;
          } else if (selected === "전체") {
            return board;
          }
        })
        .map((board: boards, idx: number) => (
          <CommunityBoard
            name={board.user}
            key={board.id}
            num={idx + 1}
            board={board}
          />
        ))}
    </>
  );
}

export default CommunityTbody;
