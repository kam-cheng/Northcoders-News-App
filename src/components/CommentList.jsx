import { useState, useEffect } from "react";
import { fetchComments } from "../utils/api";
import CommentItem from "./CommentItem";
import IncrementButton from "./IncrementButton";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";
import { Stack, Grid, Typography } from "@mui/material";

export default function CommentList({ articleId }) {
  const [commentList, setCommentList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideIncButton, sethideIncButton] = useState(false);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const comments = await fetchComments(limit, articleId);
      setCommentList(comments);
      setIsLoading(false);
      if (limit > comments.length) sethideIncButton(true);
    } catch (err) {
      setIsLoading(false);
      const customMessage =
        "loading comments failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  useEffect(() => {
    loadComments();
  }, [articleId, limit]);
  let loading = "";
  if (isLoading) loading = <Typography variant="body1">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h5" color="error">
        <ErrorComponent error={error} />
      </Typography>
    );
  return (
    <Stack sx={{ justifyContent: "center" }}>
      <Typography variant="h4" mt={5} sx={{ textAlign: "center" }}>
        Comments
      </Typography>
      {loading}
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        {commentList.map((comment) => {
          return <CommentItem comment={comment} key={comment.comment_id} />;
        })}
      </Grid>
      <IncrementButton
        setLimit={setLimit}
        name={`Comments`}
        isLoading={isLoading}
        hideIncButton={hideIncButton}
      />
    </Stack>
  );
}
