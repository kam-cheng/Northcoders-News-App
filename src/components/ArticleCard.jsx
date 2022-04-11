import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import "./ArticleCard.css";
import VoteButton from "./VoteButton";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import ErrorComponent from "./ErrorComponent";
import { deleteArticle } from "../utils/api";

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
  const [deletedArticle, setDeletedArticle] = useState(false);
  const [error, setError] = useState(false);

  if (deletedArticle) return [deletedArticle];
  return (
    <li>
      <Card sx={{ minWidth: 300, margin: "20px", maxWidth: 450 }}>
        <CardActionArea>
          <CardContent>
            <p
              className="error-message"
              style={{ display: error ? "block" : "none" }}
            >
              <ErrorComponent error={error} />
            </p>
            <Link to={`/articles/${article_id}`} className="article-link">
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {author}
              </Typography>
              <Typography variant="h5" gutterBottom color="text.primary">
                {title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {topic}
              </Typography>
              <Typography variant="body2">
                {dayjs(created_at).toString()}
              </Typography>
              <CommentOutlinedIcon fontSize="small" />
              {comment_count} Comments
            </Link>
            <VoteButton articleId={article_id} votes={votes} size={"small"} />
            <DeleteButton
              itemId={article_id}
              setDeletedItem={setDeletedArticle}
              setError={setError}
              author={author}
              deleteApiFunction={deleteArticle}
              name={"Article"}
              size={"small"}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </li>
  );
}
