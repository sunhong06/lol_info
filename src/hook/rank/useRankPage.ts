import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rank } from "../../type/type";

function useRankPage() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(100);

  const dispatch = useDispatch();

  const rankDataSeletor = useSelector(
    (state: any) => state.summonerData.rankDataArray
  );
  const point = "leaguePoints";
  //  랭킹 순서대로 정렬, 읽기전용값 새배열로 복사
  const rankDatas = rankDataSeletor
    .slice()
    .map((rank: rank) => rank.entries.slice());
  // 챌린져,그마,마스터 각각의 유저수
  const rankLength = rankDataSeletor
    .slice()
    .map((rank: rank) => rank.entries.length);
  // 한배열안에 모두담음
  const flattenedRankDatas = rankDatas.reduce(
    (acc: any, val: any) => acc.concat(val),
    []
  );
  // 한배열안에 있는 값을 leaguePoint순으로 정렬함
  const highRankingDataSort = flattenedRankDatas.sort((a: rank, b: rank) => {
    return b[point] - a[point];
  });
  // 페이지네이션 사용으로 배열자르기(랭크순위추가)
  const rankedData = highRankingDataSort.map((rank: rank, index: number) => ({
    ...rank,
    rank: index + 1,
  }));
  return { rankedData, itemsPerPage, rankLength };
}

export default useRankPage;
