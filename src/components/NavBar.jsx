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

  //toggle dropdown
  function toggleDropdown() {
    document.getElementById("navbar-myDropdown").classList.toggle("show");
  }

  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">
        Home
      </Link>
      <div className="navbar-dropdown">
        <button
          className="navbar-dropbtn"
          onClick={() => {
            toggleDropdown();
          }}
        >
          Topics
          <i className="fa fa-caret-down"></i>
        </button>
        <div id="navbar-myDropdown" className="navbar-dropdown-content">
          {topics.map(({ slug }) => {
            return (
              <Link
                to={`topics/${slug}`}
                className="navbar-dropdown-link"
                key={slug}
              >
                {slug}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
