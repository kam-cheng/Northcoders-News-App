import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import { addArticle } from "../utils/api";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PostArticle() {
  const {
    user: { username },
  } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const postArticle = await addArticle({ username, title, body, topic });
      navigate(`/articles/${postArticle.article_id}`);
    } catch (err) {
      const customMessage =
        "attempt to post article failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  // change button innerText when button is clicked
  const postingArticle = isLoading ? "Posting Article" : "Post Article";

  if (error)
    return (
      <Typography variant="h5" color="error">
        <ErrorComponent error={error} />
      </Typography>
    );
  return (
    <>
      <Box maxWidth={1000} sx={{ ml: "auto", mr: "auto" }}>
        <form onSubmit={handleSubmit}>
          <Box m={3}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ pt: 2, fontWeight: 500 }}
            >
              Post New Article
            </Typography>
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
                id="standard-required"
                label="Title"
                variant="filled"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextField
                size="medium"
                disabled={isLoading}
                required
                id="standard-required"
                label="Topic"
                variant="filled"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              />
              <TextField
                size="medium"
                disabled={isLoading}
                required
                id="standard-multiline-static"
                label="Text"
                multiline
                minRows={8}
                variant="filled"
                value={body}
                onChange={(event) => setBody(event.target.value)}
              />
              <LoadingButton
                size="medium"
                type="submit"
                endIcon={<EmailIcon />}
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
              >
                {postingArticle}
              </LoadingButton>
            </Stack>
          </Box>
        </form>
      </Box>
    </>
  );
}
