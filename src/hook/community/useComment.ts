import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../fbase/fbase";

function useComment({ userObj, board, name }: any) {
  const [comment, setComment] = useState<any>("");
  const [commentList, setCommentList] = useState<any>([]);
  const [editComment, setEditComment] = useState("");
  const [editing, setEditing] = useState(false);

  const handleCommentClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(collection(db, "Comment"), {
      comment: comment,
      createAt: Date.now(),
      createId: board.id,
      user: userObj.email,
    });
    setComment("");
    CommentLists();
  };

  const CommentLists = async () => {
    const cmtRef = collection(db, "Comment");
    const querySnapshot = await getDocs(
      query(cmtRef, orderBy("createAt", "desc"))
    );
    const newArray: string[] = [];
    querySnapshot.forEach((doc: { data: () => any; id: any }) => {
      newArray.push({ ...doc.data(), id: doc.id });
    });
    setCommentList(newArray);
  };

  const date = new Date();

  const handleRemoveClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(db, "Comment", comment.id));
      window.location.reload();
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };
  const editCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value);
  };
  // 수정완료 버튼
  const handleCompleteClick = async () => {
    const commentRef = doc(db, "Comment", comment.id);
    await updateDoc(commentRef, { comment: editComment });
    setEditComment("");
    setEditing(false);
  };
  return {
    handleCompleteClick,
    editCommentChange,
    handleEditClick,
    handleRemoveClick,
    CommentLists,
    handleCommentClick,
    comment,
    setComment,
    commentList,
    date,
    editComment,
    editing,
  };
}

export default useComment;
