import { useState } from "react";
import "./PostComment.css";
import { addComment } from "../utils/api";
import CommentItem from "./CommentItem";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";

export default function PostComment({ articleId }) {
  const [newComment, setNewComment] = useState("");
  const [postedComment, setPostedComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    user: { username },
  } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const comment = await addComment({
        articleId,
        username: username,
        body: newComment,
      });
      setNewComment("");
      setPostedComment(comment);
      setIsLoading(false);
    } catch (err) {
      const customMessage =
        "attempt to post comment failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  //return posted comment to top of page
  let displayComment = null;
  if (postedComment)
    displayComment = (
      <ul className="new-comment">
        <CommentItem comment={postedComment} />
      </ul>
    );

  if (error)
    return (
      <h3 className="error-message">
        <ErrorComponent error={error} />
      </h3>
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
