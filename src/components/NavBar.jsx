import { useState, useEffect, useRef } from "react";
import { fetchTopics } from "../utils/api";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  const node = useRef();
  const [open, setOpen] = useState(false);
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

  //toggle dropdown when clicked outside
  function toggleDropdown() {
    document.getElementById("navbar-myDropdown").classList.toggle("show");
  }

  const handleClickOutside = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    toggleDropdown();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <div className="navbar-dropdown">
          <button
            className="navbar-dropbtn"
            onClick={() => {
              setOpen(!open);
              toggleDropdown();
            }}
          >
            Topics
            <i className="fa fa-caret-down"></i>
          </button>
          <div
            id="navbar-myDropdown"
            className="navbar-dropdown-content"
            ref={node}
            onClick={() => {
              setOpen(!open);
              toggleDropdown();
            }}
          >
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
        <Link to="/articles/submit" className="navbar-link">
          Post Article
        </Link>
        <img src="images/logo-newspaper.png" alt="nc news logo" />
      </nav>
    </header>
  );
}
