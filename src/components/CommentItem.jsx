import "./CommentItem.css";
import VoteButton from "./VoteButton";
import dayjs from "dayjs";

export default function CommentItem({
  comment: { comment_id, votes, created_at, author, body },
}) {
  return (
    <li className="comment-item">
      <h4>{author}</h4>
      <h5>{dayjs(created_at).toString()}</h5>
      <p>{body}</p>
      <VoteButton commentId={comment_id} votes={votes} size={"small"} />
    </li>
  );
}
