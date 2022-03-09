import "./IncrementButton.css";

export default function IncrementButton({ limit, list, setLimit, name }) {
  const incrementLimit = async (increment) => {
    setLimit((currLimit) => {
      return currLimit + increment;
    });
  };

  if (limit > list.length) return <></>;
  return (
    <button
      className="increment-button"
      onClick={() => {
        incrementLimit(5);
      }}
    >
      Load more {name}
    </button>
  );
}
