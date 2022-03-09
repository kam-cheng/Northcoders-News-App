import { useState } from "react";
import "./PostComment.css";
import { addComment } from "../utils/api";
import CommentItem from "./CommentItem";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

export default function PostComment({ articleId }) {
  const [newComment, setNewComment] = useState("");
  const [postedComment, setPostedComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const comment = await addComment({
      articleId,
      username: user,
      body: newComment,
    });
    setNewComment("");
    setPostedComment(comment);
    setIsLoading(false);
  };

  let displayComment = null;

  if (postedComment)
    displayComment = (
      <ul className="new-comment">
        <CommentItem comment={postedComment} />
      </ul>
    );

  if (isLoading) return <p>Submitting Message...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="post-form">
        <label>
          <textarea
            className="comment-box"
            placeholder="Post a Comment"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            required
          />
          <button className="increment-button" type="submit">
            Add Comment
          </button>
        </label>
      </form>
      {displayComment}
    </>
  );
}
