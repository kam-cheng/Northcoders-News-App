import "./ArticleCard.css";

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
        <h3>{title}</h3>
        <p>{topic}</p>
        <p>author: {author}</p>
        <p>created at: {created_at}</p>
        <div className="icon">
          <p>
            <img
              className="icon"
              src="/images/comment-icon.jpg"
              alt="comments icon"
            />
            {comment_count} Comments
          </p>
        </div>
        <p>
          <img src="/images/thumb-up.png" className="icon" />
          {votes}
          <img src="/images/thumb-down.png" className="icon" />
        </p>
      </article>
    </li>
  );
}
