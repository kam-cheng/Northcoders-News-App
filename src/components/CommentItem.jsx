import "./CommentItem.css";
import VoteButton from "./VoteButton";
import dayjs from "dayjs";
import DeleteComment from "./DeleteComment";
import { useState } from "react";

export default function CommentItem({
  comment: { comment_id, votes, created_at, author, body },
}) {
  const [deletedComment, setDeletedComment] = useState(false);

  if (deletedComment) return <li>Comment Deleted!</li>;
  return (
    <li className="comment-item">
      <h4>{author}</h4>
      <h5>{dayjs(created_at).toString()}</h5>
      <p>{body}</p>
      <VoteButton commentId={comment_id} votes={votes} size={"small"} />
      <DeleteComment
        commentId={comment_id}
        setDeletedComment={setDeletedComment}
        author={author}
      />
    </li>
  );
}
