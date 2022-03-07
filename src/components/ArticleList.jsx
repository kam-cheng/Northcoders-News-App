import { useState, useEffect } from "react";
import { fetchArticles } from "./api";
import ArticleCard from "./ArticleCard.jsx";

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);

  const loadArticles = async () => {
    const articles = await fetchArticles();
    setArticleList(articles);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <section>
      <h2>Article List</h2>
      <ul>
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
      <button>Load more Articles</button>
    </section>
  );
}
