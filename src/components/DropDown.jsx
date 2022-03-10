import { useState, useEffect, useRef } from "react";

export default function DropDown({ children, list, name }) {
  const node = useRef();
  const [open, setOpen] = useState(false);

  function toggleDropdown() {
    document.getElementById(name).classList.toggle("show");
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
    <div className="dropdown-container">
      <button
        onClick={() => {
          setOpen(!open);
          toggleDropdown();
        }}
        className={`dropdown-button ${name}-button`}
      >
        {list.name}
        <i className="fa fa-caret-down"></i>
      </button>
      <div
        id={name}
        className={`dropdown-container-content ${name}-content`}
        ref={node}
        onClick={() => {
          setOpen(!open);
          toggleDropdown();
        }}
      >
        {children}
      </div>
    </div>
  );
}
