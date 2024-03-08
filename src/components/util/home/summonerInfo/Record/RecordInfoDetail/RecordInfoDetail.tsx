import RecordTeamDetail from "../RecordTeamDetail/RecordTeamDetail";
import { useDispatch } from "react-redux";
import { match, mySummonerDataType } from "../../../../../../type/type";

interface RecordInfoDetailProps {
  m: match;
  summonerDataSeletor: mySummonerDataType[0];
  handleClickSummonerName: (e: any) => void;
}

function RecordInfoDetail({
  m,
  summonerDataSeletor,
  handleClickSummonerName,
}: RecordInfoDetailProps) {
  return (
    <>
      <li className="detail">
        <div className="detail_box">
          <RecordTeamDetail
            m={m}
            summonerDataSeletor={summonerDataSeletor}
            handleClickSummonerName={handleClickSummonerName}
          />
        </div>
      </li>
    </>
  );
}

export default RecordInfoDetail;
