import { useParams } from "react-router-dom";
import { fetchArticle } from "../utils/api";
import { useState, useEffect } from "react";
import "./ArticleItem.css";
import dayjs from "dayjs";

export default function ArticleItem() {
  const { article_id: articleId } = useParams();
  const [articleItem, setArticleItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadArticle = async () => {
    const article = await fetchArticle(articleId);
    setArticleItem(article);
    setIsLoading(false);
  };

  useEffect(() => {
    loadArticle();
  }, [articleId]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <article className="article-item">
        <h2>{articleItem.title}</h2>
        <h3>{articleItem.author}</h3>
        <h4>Topic : {articleItem.topic}</h4>
        <h4>{dayjs(articleItem.created_at).toString()}</h4>
        <p>{articleItem.body}</p>
        <div className="icon large">
          <img
            className="icon large"
            src="/images/comment-icon.jpg"
            alt="comments icon"
          />
          {articleItem.comment_count} Comments
        </div>
        <div className="icon large">
          <img
            src="/images/thumb-up.png"
            className="icon large"
            alt="up vote icon"
          />
          {articleItem.votes}
          <img
            src="/images/thumb-down.png"
            className="icon large"
            alt="down vote icon"
          />
        </div>
      </article>
    </>
  );
}
