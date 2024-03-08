import React, { PropsWithChildren } from "react";

function CommunityTable({ children }: PropsWithChildren) {
  return (
    <table className="cmnt_table">
      <caption className="blind">커뮤니티</caption>
      <colgroup>
        <col className="number" />
        <col className="title" />
        <col className="user" />
        <col className="date" />
        <col className="rmd" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">등록일</th>
          <th scope="col">추천</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default CommunityTable;
