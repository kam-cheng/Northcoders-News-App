import DropDown from "./DropDown";
import { Link } from "react-router-dom";

export default function Order({ order, setOrder }) {
  const orderArray = [
    { name: "ascending", apiValue: "asc" },
    { name: "descending", apiValue: "desc" },
  ];

  return (
    <>
      <h4>
        <label htmlFor="order-dropdown">order:</label>
        <DropDown list={order} name={"order"}>
          {orderArray.map((element) => {
            return (
              <Link
                to={`?order:${element.name}`}
                key={element.name}
                className="dropdown-link"
                onClick={() => {
                  setOrder(element);
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
