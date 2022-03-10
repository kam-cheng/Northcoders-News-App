import { deleteComment } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";

export default function DeleteComment({
  commentId,
  setDeletedComment,
  author,
  setError,
}) {
  const {
    user: { username },
  } = useContext(UserContext);

  const removeComment = async () => {
    try {
      setDeletedComment(<li>Deleting Comment...</li>);
      await deleteComment(commentId);
      setDeletedComment(<li>Comment Deleted!</li>);
    } catch (err) {
      setDeletedComment(false);
      setError(true);
    }
  };

  if (author !== username) return <></>;
  return (
    <button
      onClick={() => {
        removeComment();
      }}
      className="button-delete"
    >
      <img
        src="/images/delete-icon.png"
        className="icon small"
        alt="delete comment button"
      />
    </button>
  );
}
