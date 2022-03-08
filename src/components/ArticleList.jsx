import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard.jsx";
import IncrementButton from "./IncrementButton";
import { useParams } from "react-router-dom";
import "./ArticleList.css";

export default function ArticleList() {
  const { topic } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  //increase number of articles shown when button clicked
  const loadArticles = async () => {
    const articles = await fetchArticles(limit, topic);
    setArticleList(articles);
    setIsLoading(false);
  };

  // articles will re-render each time limit or topic changes
  useEffect(() => {
    loadArticles();
  }, [limit, topic]);

  if (isLoading) return <p>Loading...</p>;
  return (
    <section className="article-list">
      <h2 className="title">{topic || `Article List`}</h2>
      <ul>
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
      <IncrementButton
        articleList={articleList}
        setLimit={setLimit}
        limit={limit}
      />
    </section>
  );
}
