import { useState, useEffect } from "react";
import { fetchComments } from "../utils/api";
import CommentItem from "./CommentItem";
import IncrementButton from "./IncrementButton";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";

export default function CommentList({ articleId }) {
  const [commentList, setCommentList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideIncButton, sethideIncButton] = useState(false);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const comments = await fetchComments(limit, articleId);
      setCommentList(comments);
      setIsLoading(false);
      if (limit > comments.length) sethideIncButton(true);
    } catch (err) {
      setIsLoading(false);
      const customMessage =
        "loading comments failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  useEffect(() => {
    loadComments();
  }, [articleId, limit]);
  let loading = "";
  if (isLoading) loading = <p className="loading-bar">Loading...</p>;
  if (error)
    return (
      <h2 className="error-message">
        <ErrorComponent error={error} />
      </h2>
    );
  return (
    <section className="comment-list">
      <h3>Comments</h3>
      {loading}
      <ul>
        {commentList.map((comment) => {
          return <CommentItem comment={comment} key={comment.comment_id} />;
        })}
      </ul>
      <IncrementButton
        setLimit={setLimit}
        name={`Comments`}
        isLoading={isLoading}
        hideIncButton={hideIncButton}
      />
    </section>
  );
}
