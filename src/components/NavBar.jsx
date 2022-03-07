import { useState, useEffect } from "react";
import { fetchTopics } from "./api";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [topics, setTopics] = useState([]);

  //fetch topics list
  const getTopics = async () => {
    const topics = await fetchTopics();
    setTopics(topics);
  };

  //run function on mount only
  useEffect(() => {
    getTopics();
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {topics.map(({ slug }) => {
          return (
            <li key={slug}>
              <Link to={`topics/${slug}`}>{slug}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
