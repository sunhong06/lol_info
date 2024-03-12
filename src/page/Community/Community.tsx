import React, { useEffect, useState } from "react";
import "../../scss/Community/community.scss";
import { Link, useNavigate } from "react-router-dom";
import Category from "../../components/util/community/category/Category";
import CommunitySearch from "../../components/util/community/communitySearch/CommunitySearch";
// import CommunityPage from "../../components/util/community/communityPage/CommunityPage";
import { useSelector } from "react-redux";
import CommunityTable from "../../components/util/community/communityTable/CommunityTable";
import useCommunity from "../../hook/community/useCommunity";
import CommunityTbody from "../../components/util/community/communityTbody/CommunityTbody";
import Loading from "../../components/loading/Loading";
import ReactPaginate from "react-paginate";
import usePagination from "../../hook/usePagination";
import { useUsers } from "../../hook/users/useUsers";
import { onAuthStateChanged } from "firebase/auth";
import { AuthService } from "../../fbase/fbase";

const Community = () => {
  const [itemOffset, setItemOffset] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const navigate = useNavigate();
  const { Bring, catagorys, selected, boardList, isLoading } = useCommunity();

  const communitySearchSeletor = useSelector(
    (state: any) => state.summonerData.communitySearchArray
  );
  const endOffset = itemOffset + itemsPerPage;
  const currentItemResult = boardList.slice(itemOffset, endOffset);

  const currentSearchItemResult = communitySearchSeletor.slice(
    itemOffset,
    endOffset
  );
  const pageCount = Math.ceil(boardList.length / itemsPerPage);

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * itemsPerPage) % boardList.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    onAuthStateChanged(AuthService, (user) => {
      if (user) {
        Bring();
      } else {
        alert("로그인이 필요합니다.");
        navigate("/Login");
      }
    });
  }, [communitySearchSeletor]);

  return (
    <>
      {isLoading ? (
        <main className="cmnt_main">
          <div className="inner_cmnt">
            <div className="cmnt_flex">
              <h2 className="cmnt_title">커뮤니티</h2>
              <Category catagorys={catagorys} />
            </div>
            <div className="cmnt_box">
              <CommunityTable>
                {communitySearchSeletor.length == 0 ? (
                  <CommunityTbody
                    result={currentItemResult}
                    selected={selected}
                  />
                ) : (
                  <CommunityTbody
                    result={currentSearchItemResult}
                    selected={selected}
                  />
                )}
              </CommunityTable>
              <button className="Writing_btn">
                <Link to="/Writing" className="writing">
                  글작성
                </Link>
              </button>
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

              <CommunitySearch />
            </div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Community;
