import { FaSearch } from "react-icons/fa";
import useRankSearch from "../../hook/rank/useRankSearch";

function RankSearch() {
  const { setSearch, search, onHandleSearchClick } = useRankSearch();

  return (
    <div className="rank_input">
      <input
        type="search"
        placeholder="소환사 명"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rank_search"
        title="검색"
      />
      <button type="submit" onClick={onHandleSearchClick}>
        <FaSearch />
      </button>
    </div>
  );
}

export default RankSearch;
