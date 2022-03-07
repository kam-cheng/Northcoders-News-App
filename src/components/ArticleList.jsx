import { useState, useEffect } from "react";
import { fetchArticles } from "./api";
import ArticleCard from "./ArticleCard.jsx";

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [limit, setLimit] = useState(10);

  //increase number of articles shown when button clicked
  const incrementLimit = async (increment) => {
    setLimit((currLimit) => {
      return currLimit + increment;
    });
  };

  const loadArticles = async () => {
    const articles = await fetchArticles(limit);
    setArticleList(articles);
  };

  // articles will re-render each time limit is amended
  useEffect(() => {
    loadArticles();
  }, [limit]);

  const IncrementButton = () => {
    if (articleList[0] && limit > articleList[0].total_count)
      return <h2>No more articles</h2>;
    return (
      <button
        onClick={() => {
          incrementLimit(5);
        }}
      >
        Load more Articles
      </button>
    );
  };

  return (
    <section>
      <h2>Article List</h2>
      <ul>
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
      <IncrementButton />
    </section>
  );
}
