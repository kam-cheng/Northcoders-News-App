import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
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
    <ListItem disablePadding>
      <Card
        sx={{ minWidth: 340, margin: "20px", maxWidth: 450 }}
        align="center"
      >
        <CardActionArea>
          <CardContent>
            <Typography
              variant="body1"
              sx={{ display: error ? "block" : "none" }}
              color="error"
            >
              <ErrorComponent error={error} />
            </Typography>
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
            </Link>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Link to={`/articles/${article_id}`} className="article-link">
                <Button
                  variant="text"
                  startIcon={<CommentOutlinedIcon fontSize="small" />}
                  color="inherit"
                >
                  {comment_count} Comments
                </Button>
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
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </ListItem>
  );
}
