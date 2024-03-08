import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../../scss/Community/CommunityBoard.scss";
import { boards } from "../../../../type/type";
import useCommunityBoard from "../../../../hook/community/useCommunityBoard";
import useCommunity from "../../../../hook/community/useCommunity";

interface CommunityBoardProps {
  board: boards;
  num: number;
  name: string;
}

function CommunityBoard({ board, num, name }: CommunityBoardProps) {
  const { date, views } = useCommunityBoard({ board });
  const { isSearch } = useCommunity();
  useEffect(() => {
    views();
  }, []);

  return (
    <tr className="board" key={board.id} onClick={views}>
      <td>
        <Link to={`/Community/${board.id}`} state={{ board, name }}>
          {num}
        </Link>
      </td>
      <td>
        <Link to={`/Community/${board.id}`} state={{ board, name }}>
          [{board.option}] {board.title}
        </Link>
      </td>
      <td>
        <Link to={`/Community/${board.id}`} state={{ board, name }}>
          {name}
        </Link>
      </td>
      <td>
        <Link to={`/Community/${board.id}`} state={{ board, name }}>
          {date.getFullYear() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getDate()}
        </Link>
      </td>
      <td>
        <Link to={`/Community/${board.id}`} state={{ board, name }}>
          {board.up}
        </Link>
      </td>
    </tr>
  );
}

export default React.memo(CommunityBoard);
