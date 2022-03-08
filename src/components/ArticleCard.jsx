import "./ArticleCard.css";
import VoteButton from "./VoteButton";
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
    <li>
      <article className="article-card">
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
      </article>
    </li>
  );
}
