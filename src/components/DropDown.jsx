export default function DropDown({ children, list, name }) {
  function toggleDropdown() {
    document.getElementById(name).classList.toggle("show");
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(`.${name}-button`)) {
      const dropdowns = document.getElementsByClassName(`${name}-content`);
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  return (
    <div className="dropdown-container">
      <button
        onClick={() => {
          toggleDropdown();
        }}
        className={`dropdown-button ${name}-button`}
      >
        {list.name}
        <i className="fa fa-caret-down"></i>
      </button>
      <div id={name} className={`dropdown-container-content ${name}-content`}>
        {children}
      </div>
    </div>
  );
}
