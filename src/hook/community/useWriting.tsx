import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../fbase/fbase";
import { useNavigate } from "react-router-dom";

function useWriting({ userObj }: any) {
  const [titleValue, setTitleValue] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [optionValue, setOptionValue] = useState("자유");
  const navigate = useNavigate();
  const addBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addDoc(collection(db, "Board"), {
      title: titleValue,
      detail: detailValue,
      option: optionValue,
      createAt: Date.now(),
      view: 0,
      up: 0,
      user: userObj.email,
    });
    navigate("/Community");
  };

  const HandleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionValue(e.target.value);
    console.log(e.target.value);
    if (e.target.value == "선택") {
      alert("카테고리를 선택해주세요.");
    }
  };

  const onChangeTitle = (e: any) => {
    setTitleValue(e.target.value);
  };
  const onChangeDetail = (e: any) => {
    setDetailValue(e.target.value);
  };

  return {
    HandleChangeOption,
    addBoard,
    onChangeDetail,
    onChangeTitle,
    detailValue,
    titleValue,
  };
}

export default useWriting;
