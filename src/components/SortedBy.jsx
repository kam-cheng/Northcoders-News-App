import { Link } from "react-router-dom";
import "./DropDown.css";
import DropDown from "./DropDown";

export default function SortedBy({ sortBy, setSortBy }) {
  const sortByArray = [
    { name: "date", apiValue: "created_at" },
    { name: "comment count", apiValue: "comment_count" },
    { name: "votes", apiValue: "votes" },
  ];

  return (
    <>
      <h4>
        sorted by
        <DropDown list={sortBy} name={"sortBy"}>
          {sortByArray.map((element) => {
            return (
              <Link
                to={`?sort_by:${element.name}`}
                key={element.name}
                className="dropdown-link"
                onClick={() => {
                  setSortBy(element);
                }}
              >
                {element.name}
              </Link>
            );
          })}
        </DropDown>
      </h4>
    </>
  );
}
