import { addArticle } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import "./PostArticle.css";
import { useNavigate } from "react-router-dom";

export default function PostArticle() {
  const {
    user: { username },
  } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //require title, body, topic

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const postArticle = await addArticle({ username, title, body, topic });
    navigate(`/articles/${postArticle.article_id}`);
  };

  if (isLoading) return <p>Submitting Article...</p>;
  return (
    <>
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
          <button className="increment-button article" type="submit">
            Post Article
          </button>
        </label>
      </form>
    </>
  );
}
