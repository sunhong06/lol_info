import React, { useEffect } from "react";
import { FaComment } from "react-icons/fa";
import Comment from "./Comment";
import { comments } from "../../../../type/type";
import useComment from "../../../../hook/community/useComment";

interface CommentInputProps {
  userObj: any;
  board: any;
  name: string;
}

function CommentInput({ userObj, board, name }: CommentInputProps) {
  const {
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
  } = useComment({ userObj, board, name });

  useEffect(() => {
    CommentLists();
  }, []);

  return (
    <>
      <div className="comment_box">
        <h3 className="comment_title">
          <FaComment />
          댓글
        </h3>
        <form className="comment_form" onSubmit={handleCommentClick}>
          <fieldset>
            <legend className="blind">댓글창</legend>
            <label htmlFor="comment_bar" className="blind">
              작성자
            </label>
            <input
              id="comment_bar"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              placeholder="댓글을 입력하세요"
            />
            <input type="submit" value="등록" />
          </fieldset>
        </form>
      </div>
      <ul className="comment_list">
        <>
          {commentList.map(
            (comment: comments) =>
              board.id == comment.createId && (
                <Comment
                  date={date}
                  handleRemoveClick={handleRemoveClick}
                  handleEditClick={handleEditClick}
                  editCommentChange={editCommentChange}
                  handleCompleteClick={handleCompleteClick}
                  userObj={userObj}
                  name={name}
                  comment={comment}
                  key={comment.id}
                  editing={editing}
                  editComment={editComment}
                />
              )
          )}
        </>
      </ul>
    </>
  );
}

export default CommentInput;
