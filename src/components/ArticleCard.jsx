import "./ArticleCard.css";
import VoteButton from "./VoteButton";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { deleteArticle } from "../utils/api";

export default function ArticleCard({
  article: {
    article_id,
    author,
    comment_count,
    created_at,
    title,
    topic,
    total_count,
    votes,
  },
}) {
  const [deletedArticle, setDeletedArticle] = useState(false);
  const [error, setError] = useState(false);

  if (deletedArticle) return [deletedArticle];
  return (
    <li>
      <article className="article-card">
        <p
          className="error-message"
          style={{ display: error ? "block" : "none" }}
        >
          <ErrorComponent error={error} />
        </p>
        <Link to={`/articles/${article_id}`} className="article-link">
          <h3>{title}</h3>
          <p>{topic}</p>
          <p>author: {author}</p>
          <p>{dayjs(created_at).toString()}</p>
          <div className="icon small">
            <img
              className="icon small"
              src="/images/comment-icon.jpg"
              alt="comments icon"
            />
            {comment_count} Comments
          </div>
        </Link>
        <VoteButton articleId={article_id} votes={votes} size={"small"} />
        <DeleteButton
          itemId={article_id}
          setDeletedItem={setDeletedArticle}
          setError={setError}
          author={author}
          deleteApiFunction={deleteArticle}
          name={"Article"}
          size={"small"}
        />
      </article>
    </li>
  );
}
