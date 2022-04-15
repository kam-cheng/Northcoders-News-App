import { useState } from "react";
import { addComment } from "../utils/api";
import CommentItem from "./CommentItem";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";
import { Box, Button, Stack, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function PostComment({ articleId }) {
  const [newComment, setNewComment] = useState("");
  const [postedComment, setPostedComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    user: { username },
  } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const comment = await addComment({
        articleId,
        username: username,
        body: newComment,
      });
      setNewComment("");
      setPostedComment(comment);
      setIsLoading(false);
    } catch (err) {
      const customMessage =
        "attempt to post comment failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  //return posted comment to top of page
  let displayComment = null;
  if (postedComment)
    displayComment = (
      <Box mt={5}>
        <CommentItem comment={postedComment} />
      </Box>
    );

  if (error)
    return (
      <h3 className="error-message">
        <ErrorComponent error={error} />
      </h3>
    );
  if (isLoading) return <p>Submitting Message...</p>;
  return (
    <Box maxWidth={600} sx={{ ml: "auto", mr: "auto", mt: 5 }}>
      <form onSubmit={handleSubmit} className="post-form">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          sx={{ mt: 4 }}
        >
          <TextField
            size="medium"
            disabled={isLoading}
            required
            id="standard-multiline-static"
            label="Post a Comment"
            variant="filled"
            multiline
            value={newComment}
            minRows={4}
            onChange={(event) => setNewComment(event.target.value)}
            sx={{ m: { md: 3 } }}
          ></TextField>
          <Button
            size="medium"
            type="submit"
            endIcon={<EmailIcon />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
          >
            Add Comment
          </Button>
        </Stack>
      </form>
      {displayComment}
    </Box>
  );
}
