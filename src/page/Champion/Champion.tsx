import React, { lazy, Suspense, useEffect } from "react";
import "../../scss/Champion/ChampionInfo.scss";
import ChampionList from "../../components/util/champion/ChampionList/ChampionList";
import ChampionRotations from "../../components/util/champion/ChampionRotations/ChampionRotations";
import ChampoinSearch from "../../components/util/champion/ChampionSearch/ChampoinSearch";
// import ChampDetailModal from "../../components/util/champion/ChampDetailModal/ChampDeatilModal";
import { v4 as uuidv4 } from "uuid";
import useChampion from "../../hook/champion/useChampion";
import Loading from "../../components/loading/Loading";
const ChampDetailModal = React.lazy(
  () =>
    import("../../components/util/champion/ChampDetailModal/ChampDeatilModal")
);

function Champion() {
  const {
    getRotations,
    rotation,
    champs,
    setDetail,
    setSearch,
    search,
    detail,
    isLoading,
  } = useChampion();

  useEffect(() => {
    getRotations();
  }, []);
  console.log(detail);
  return (
    <>
      {isLoading ? (
        <main>
          <h2 className="champion_title">챔피언정보</h2>
          <ChampionRotations
            rotation={rotation}
            champs={champs}
            setDetail={setDetail}
          />
          <ChampoinSearch setSearch={setSearch} search={search} />
          <ul className="champion_table">
            <ChampionList
              setDetail={setDetail}
              champs={champs}
              search={search}
            />
          </ul>
          {detail && (
            <Suspense fallback={<Loading />}>
              <ChampDetailModal setDetail={setDetail} key={uuidv4()} />
            </Suspense>
          )}
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Champion;
