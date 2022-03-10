import { deleteComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function DeleteComment({
  commentId,
  setDeletedComment,
  author,
}) {
  const {
    user: { username },
  } = useContext(UserContext);

  const removeComment = async () => {
    await deleteComment(commentId);
    setDeletedComment(true);
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
