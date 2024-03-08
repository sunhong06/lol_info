import React from "react";

interface RecordMoreProps {
  startingNum: number;
  handleClickMore: () => void;
}

function RecordMore({ startingNum, handleClickMore }: RecordMoreProps) {
  return (
    <>
      {startingNum <= 100 ? (
        <li className="more">
          <button onClick={handleClickMore}>더보기</button>
        </li>
      ) : undefined}
    </>
  );
}

export default RecordMore;
