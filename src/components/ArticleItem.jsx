import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { fetchArticle } from "../utils/api";
import { deleteArticle } from "../utils/api";
import handleErrorMessage from "../utils/handle-error-message";
import VoteButton from "./VoteButton";
import CommentList from "./CommentList";
import PostComment from "./PostComment";
import ErrorComponent from "./ErrorComponent";
import DeleteButton from "./DeleteButton";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { Box, Divider, Stack, Typography } from "@mui/material";

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

  if (isLoading) return <Typography variant="h5">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h5" color="error">
        <ErrorComponent error={error} />
      </Typography>
    );
  if (deletedArticle) return <Box m={5}>{deletedArticle}</Box>;
  return (
    <Box maxWidth={1000} sx={{ ml: "auto", mr: "auto" }}>
      <Box sx={{ m: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ m: { md: 3 } }}
        >
          {articleItem.title}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          textAlign="center"
          sx={{ m: { md: 3 } }}
        >
          by: {articleItem.author}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          textAlign="center"
          sx={{ m: { md: 3 } }}
        >
          Topic : {articleItem.topic}
        </Typography>
        <Typography
          variant="subtitle2"
          gutterBottom
          textAlign="center"
          sx={{ m: { md: 3 } }}
        >
          {dayjs(articleItem.created_at).format("dddd D MMMM YYYY h:mm A")}
        </Typography>
        <Divider sx={{ mt: 2, mb: 4 }} />
        <Typography
          variant="body1"
          gutterBottom
          sx={{ lineHeight: 2, m: { md: 3 } }}
          textAlign="justify"
        >
          {articleItem.body}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
          sx={{ mt: 3 }}
        >
          <Stack direction="row" spacing={1}>
            <CommentOutlinedIcon fontSize="medium" />
            <Typography variant="button">
              {articleItem.comment_count} Comments
            </Typography>
          </Stack>
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
        </Stack>
        <PostComment articleId={articleItem.article_id} />
      </Box>
      <CommentList articleId={articleItem.article_id} />
    </Box>
  );
}
