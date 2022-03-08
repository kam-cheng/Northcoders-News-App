import "./ArticleCard.css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

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
  return (
    <Link to={`/articles/${article_id}`} className="article-link">
      <li>
        <article className="article-card">
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
          <div className="icon small">
            <img
              src="/images/thumb-up.png"
              className="icon small"
              alt="up vote icon"
            />
            {votes}
            <img
              src="/images/thumb-down.png"
              className="icon small"
              alt="down vote icon"
            />
          </div>
        </article>
      </li>
    </Link>
  );
}
