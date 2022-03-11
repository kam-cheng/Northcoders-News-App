import { deleteComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import handleErrorMessage from "../utils/handle-error-message";

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
      const customMessage =
        "attempt to delete message failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
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
        className="icon large"
        alt="delete comment button"
      />
    </button>
  );
}
