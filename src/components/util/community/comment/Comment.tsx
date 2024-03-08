import React, { useState } from "react";
import "../../../../scss/Community/comment.scss";

function Comment({
  userObj,
  comment,
  date,
  handleRemoveClick,
  handleEditClick,
  editCommentChange,
  handleCompleteClick,
  editing,
  editComment,
}: any) {
  return (
    <>
      <li>
        <span>{comment.user}</span>
        <span className="date">
          {Number(date.getFullYear()) +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes()}
        </span>
        <p className="commemt_field">{comment.comment}</p>
        {userObj && comment.user == userObj.email && (
          <>
            <button
              type="button"
              onClick={handleRemoveClick}
              className="remove"
            >
              삭제
            </button>
            <button type="button" onClick={handleEditClick} className="edit">
              수정
            </button>
            {editing && (
              <>
                <input
                  type="text"
                  value={editComment}
                  onChange={editCommentChange}
                  className="edit_Input"
                />
                <button type="button" onClick={handleCompleteClick}>
                  확인
                </button>
              </>
            )}
          </>
        )}
      </li>
    </>
  );
}

export default Comment;
