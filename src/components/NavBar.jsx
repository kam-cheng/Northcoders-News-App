import { useState, useEffect } from "react";
import { fetchTopics } from "../utils/api";
import { Link } from "react-router-dom";
import "./NavBar.css";

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
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="dropdown">
          <button className="dropbtn">
            Topics
            <i className="fa fa-caret-down"></i>
          </button>
          <ul className="dropdown-content" id="myDropdown">
            {topics.map(({ slug }) => {
              return (
                <li key={slug}>
                  <Link to={`topics/${slug}`} className="link">
                    {slug}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
