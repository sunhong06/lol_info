import React, { useEffect } from "react";
import { RiThumbUpFill } from "react-icons/ri";
import useCommunityBoard from "../../../../hook/community/useCommunityBoard";

function CommunityRecommendation({ board }: any) {
  const { HandleRecommendation, onRecommendation, lookup } = useCommunityBoard({
    board,
  });

  useEffect(() => {
    onRecommendation();
  }, []);

  return (
    <div className="recommendation">
      <button title="공감하기" onClick={HandleRecommendation} className="up">
        <RiThumbUpFill />
        {lookup.up}
      </button>
    </div>
  );
}

export default CommunityRecommendation;
