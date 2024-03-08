import { doc, increment, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../fbase/fbase";

function useCommunityBoard({ board }: any) {
  const [view, setView] = useState(0);
  const [lookup, setLookUp] = useState(board.up);
  const date = new Date(board.createAt);

  const views = async () => {
    setView((prev) => prev + 1);
    const viewRef = doc(db, "Board", board.id);
    await updateDoc(viewRef, {
      view: increment(view),
    });
  };

  const HandleRecommendation = async () => {
    const onRef = doc(db, "Board", board.id);
    await updateDoc(onRef, {
      up: increment(+1),
    });
  };

  const onRecommendation = () => {
    onSnapshot(doc(db, "Board", board.id), (doc) => {
      return setLookUp(doc.data());
    });
  };

  return {
    HandleRecommendation,
    onRecommendation,
    views,
    date,
    board,
    lookup,
  };
}

export default useCommunityBoard;
