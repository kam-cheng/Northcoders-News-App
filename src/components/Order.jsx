import DropDown from "./DropDown";

export default function Order({ order, setOrder }) {
  const orderArray = [
    { name: "ascending", apiValue: "asc" },
    { name: "descending", apiValue: "desc" },
  ];

  return (
    <>
      <h4>
        order:
        <DropDown list={order} name={"order"}>
          {orderArray.map((element) => {
            return (
              <p
                to={element.name}
                key={element.name}
                className="dropdown-link"
                onClick={() => {
                  setOrder(element);
                }}
              >
                {element.name}
              </p>
            );
          })}
        </DropDown>
      </h4>
    </>
  );
}
