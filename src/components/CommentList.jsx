import { useState, useEffect } from "react";
import { fetchComments } from "../utils/api";
import CommentItem from "./CommentItem";
import IncrementButton from "./IncrementButton";

export default function CommentList({ articleId }) {
  const [commentList, setCommentList] = useState([]);
  const [limit, setLimit] = useState(10);

  const loadComments = async () => {
    const comments = await fetchComments(limit, articleId);
    setCommentList(comments);
  };

  useEffect(() => {
    loadComments();
  }, [articleId, limit]);

  return (
    <section>
      <h3>Comments</h3>
      <ul className="comment-list">
        {commentList.map((comment) => {
          return <CommentItem comment={comment} key={comment.comment_id} />;
        })}
      </ul>
      <IncrementButton
        list={commentList}
        setLimit={setLimit}
        limit={limit}
        name={`Comments`}
      />
    </section>
  );
}
