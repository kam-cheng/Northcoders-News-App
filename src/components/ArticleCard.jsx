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
        <p>topic: {topic}</p>
        <p>author: {author}</p>
        <p>created at: {created_at}</p>
        <h3>{title}</h3>
        <p>total comments: {comment_count}</p>
        <p>votes: {votes}</p>
      </article>
    </li>
  );
}
