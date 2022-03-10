import "./CommentItem.css";
import VoteButton from "./VoteButton";
import dayjs from "dayjs";
import DeleteComment from "./DeleteComment";
import { useState } from "react";

export default function CommentItem({
  comment: { comment_id, votes, created_at, author, body },
}) {
  const [deletedComment, setDeletedComment] = useState(false);
  const [error, setError] = useState(false);

  let errorMessage = <></>;
  if (error)
    errorMessage = (
      <p className="error-message">
        Unable to delete message. Refresh and try again
      </p>
    );

  if (deletedComment) return [deletedComment];
  return (
    <li className="comment-item">
      {errorMessage}
      <h4>{author}</h4>
      <h5>{dayjs(created_at).toString()}</h5>
      <p>{body}</p>
      <VoteButton commentId={comment_id} votes={votes} size={"large"} />
      <DeleteComment
        commentId={comment_id}
        setDeletedComment={setDeletedComment}
        setError={setError}
        author={author}
      />
    </li>
  );
}
