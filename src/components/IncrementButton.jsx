import "./IncrementButton.css";

export default function IncrementButton({ limit, articleList, setLimit }) {
  const incrementLimit = async (increment) => {
    setLimit((currLimit) => {
      return currLimit + increment;
    });
  };

  if (articleList[0] && limit > articleList[0].total_count)
    return <h2>No more articles</h2>;
  return (
    <button
      className="increment-button"
      onClick={() => {
        incrementLimit(5);
      }}
    >
      Load more Articles
    </button>
  );
}
