import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle } from "../utils/api";
import "./ArticleCard.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import VoteButton from "./VoteButton";
import DeleteButton from "./DeleteButton";
import ErrorComponent from "./ErrorComponent";
import Grid from "@mui/material/Grid";

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
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card sx={{ margin: "20px", maxWidth: 400 }} align="center">
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
    </Grid>
  );
}
