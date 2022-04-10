import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { addArticle } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import "./PostArticle.css";
import { useNavigate } from "react-router-dom";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";

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

  if (error)
    return (
      <h3 className="error-message">
        <ErrorComponent error={error} />
      </h3>
    );
  if (isLoading) return <p>Submitting Article...</p>;
  return (
    <>
      <section className="article-form">
        <form onSubmit={handleSubmit} className="article-form">
          <label>
            <h2>Post New Article</h2>
            <input
              placeholder="Title"
              className="article-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <input
              placeholder="Topic"
              className="article-input"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              required
            />
            <textarea
              className="article-text-box"
              placeholder="Text"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              required
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
              endIcon={<EmailIcon />}
            >
              Post Article
            </Button>
          </label>
        </form>
      </section>
    </>
  );
}
