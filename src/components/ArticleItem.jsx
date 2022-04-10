import { useParams } from "react-router-dom";
import { fetchArticle } from "../utils/api";
import { useState, useEffect } from "react";
import "./ArticleItem.css";
import dayjs from "dayjs";
import VoteButton from "./VoteButton";
import CommentList from "./CommentList";
import PostComment from "./PostComment";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";
import { deleteArticle } from "../utils/api";
import DeleteButton from "./DeleteButton";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

export default function ArticleItem() {
  const { article_id: articleId } = useParams();
  const [articleItem, setArticleItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedArticle, setDeletedArticle] = useState(false);

  const loadArticle = async () => {
    try {
      setIsLoading(true);
      const article = await fetchArticle(articleId);
      setArticleItem(article);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const customMessage = "loading failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  useEffect(() => {
    loadArticle();
  }, [articleId]);

  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <h1 className="error-message">
        <ErrorComponent error={error} />
      </h1>
    );
  if (deletedArticle)
    return <h2 className="heading-deleted">{deletedArticle}</h2>;
  return (
    <>
      <section className="article-page">
        <article className="article-item">
          <h2>{articleItem.title}</h2>
          <h3>{articleItem.author}</h3>
          <h4>Topic : {articleItem.topic}</h4>
          <h4>{dayjs(articleItem.created_at).toString()}</h4>
          <p>{articleItem.body}</p>
          <div className="icon large">
            <CommentOutlinedIcon fontSize="large" />
            {articleItem.comment_count} Comments
          </div>
          <VoteButton
            articleId={articleItem.article_id}
            votes={articleItem.votes}
            size={"large"}
          />
          <DeleteButton
            itemId={articleItem.article_id}
            setDeletedItem={setDeletedArticle}
            setError={setError}
            author={articleItem.author}
            deleteApiFunction={deleteArticle}
            name={"Article"}
            size={"large"}
          />
        </article>
        <PostComment articleId={articleItem.article_id} />
        <CommentList articleId={articleItem.article_id} />
      </section>
    </>
  );
}
