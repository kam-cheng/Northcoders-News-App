import "./CommentItem.css";
import VoteButton from "./VoteButton";
import dayjs from "dayjs";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { deleteComment } from "../utils/api";

export default function CommentItem({
  comment: { comment_id, votes, created_at, author, body },
}) {
  const [deletedComment, setDeletedComment] = useState(false);
  const [error, setError] = useState(false);

  if (deletedComment) return [deletedComment];
  return (
    <li>
      <article className="comment-item">
        <p
          className="error-message"
          style={{ display: error ? "block" : "none" }}
        >
          <ErrorComponent error={error} />
        </p>
        <h4>{author}</h4>
        <h5>{dayjs(created_at).toString()}</h5>
        <p>{body}</p>
        <VoteButton commentId={comment_id} votes={votes} size={"large"} />
        <DeleteButton
          itemId={comment_id}
          setDeletedItem={setDeletedComment}
          setError={setError}
          author={author}
          deleteApiFunction={deleteComment}
          name={"Comment"}
          size={"large"}
        />
      </article>
    </li>
  );
}
