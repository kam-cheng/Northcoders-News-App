import { useState, useEffect } from "react";
import { fetchArticles } from "./api";
import ArticleCard from "./ArticleCard.jsx";
import IncrementButton from "./IncrementButton";

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

  return (
    <section>
      <h2>Article List</h2>
      <ul>
        {articleList.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </ul>
      <IncrementButton
        articleList={articleList}
        incrementLimit={incrementLimit}
        limit={limit}
      />
    </section>
  );
}
