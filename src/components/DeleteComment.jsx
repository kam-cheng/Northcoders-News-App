import { deleteComment } from "../utils/api";

export default function DeleteComment({ commentId, setDeletedComment }) {
  //get user details
  //request to server to delete comment
  const removeComment = async () => {
    console.log(commentId);
    await deleteComment(commentId);
    setDeletedComment(true);
  };

  return (
    <button
      onClick={() => {
        removeComment();
      }}
    >
      delete
    </button>
  );
}
