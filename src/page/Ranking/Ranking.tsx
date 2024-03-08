import React, { useCallback, useEffect, useState } from "react";
import { lolAxios } from "../../axios/axios";
import "../../scss/Ranking/ranking.scss";
import "../../scss/Ranking/RankingPage.scss";
import RankingData from "../../components/rank/rankingData/RankingData";
// import RankingPage from "../../components/rank/RankingPage";
import RankSearch from "../../components/rank/RankSearch";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState, rank } from "../../type/type";
import ReactPaginate from "react-paginate";
import usePagination from "../../hook/usePagination";
import useRankPage from "../../hook/rank/useRankPage";
import useRank from "../../hook/rank/useRank";
import Loading from "../../components/loading/Loading";

function Ranking() {
  const dispatch = useDispatch();
  const { getCRankingData, isLoading } = useRank();
  const { rankedData, itemsPerPage, rankLength } = useRankPage();

  const { handlePageClick, currentItemResult, pageCount } = usePagination({
    rankedData,
    itemsPerPage,
  });
  // 검색한 값
  const rankSearchedSeletor = useSelector(
    (state: RootState) => state.summonerData.rankSearchArray
  );
  const rankingData = useCallback(() => {
    getCRankingData();
  }, []);

  useEffect(() => {
    rankingData();

    return () => {
      dispatch({ type: "summonerDataReducer/RankReset" });
    };
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <main className="rank_main">
          <div className="notion">
            ** 챌린져 ~ 마스터까지의 랭킹만 나옵니다 **
          </div>
          <form className="rank_form">
            <fieldset>
              <legend className="blind">소환사 랭킹 검색창</legend>
              <RankSearch />
            </fieldset>
          </form>
          <table className="rank_table">
            <thead>
              <tr>
                <th scope="col">순위</th>
                <th scope="col">소환사명</th>
                <th scope="col">티어</th>
                <th scope="col">LP</th>
                <th scope="col">
                  <span>승률</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <RankingData
                rankSearchedSeletor={rankSearchedSeletor}
                rankLength={rankLength}
                currentRankResult={currentItemResult}
              />
            </tbody>
          </table>
          <div className="page">
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              containerClassName={"page_container"}
            />
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Ranking;
