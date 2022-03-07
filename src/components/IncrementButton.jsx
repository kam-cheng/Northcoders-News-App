export default function IncrementButton({
  limit,
  articleList,
  incrementLimit,
}) {
  if (articleList[0] && limit > articleList[0].total_count)
    return <h2>No more articles</h2>;
  return (
    <button
      onClick={() => {
        incrementLimit(5);
      }}
    >
      Load more Articles
    </button>
  );
}
