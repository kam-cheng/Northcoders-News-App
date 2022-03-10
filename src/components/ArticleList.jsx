import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard.jsx";
import IncrementButton from "./IncrementButton";
import { useParams } from "react-router-dom";
import "./ArticleList.css";
import SortedBy from "./SortedBy";
import Order from "./Order";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";

export default function ArticleList() {
  const { topic } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState({
    name: "date",
    apiValue: "created_at",
  });
  const [order, setOrder] = useState({
    name: "descending",
    apiValue: "desc",
  });
  const [error, setError] = useState(null);

  //increase number of articles shown when button clicked
  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const articles = await fetchArticles(
        limit,
        topic,
        sortBy.apiValue,
        order.apiValue
      );
      setArticleList(articles);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const customMessage = "loading failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  // articles will re-render each time limit or topic changes
  useEffect(() => {
    loadArticles();
  }, [limit, topic, sortBy, order]);
  let loading = "";
  if (isLoading) loading = <p className="loading-bar">Loading...</p>;
  if (error) return <ErrorComponent error={error} />;
  return (
    <>
      <section className="article-list">
        <div className="selectors">
          <SortedBy sortBy={sortBy} setSortBy={setSortBy} />
          <Order order={order} setOrder={setOrder} />
        </div>
        <h2 className="title">{topic || `Article List`}</h2>
        {loading}
        <ul>
          {articleList.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
        <IncrementButton
          list={articleList}
          setLimit={setLimit}
          limit={limit}
          name={`Articles`}
        />
      </section>
    </>
  );
}
