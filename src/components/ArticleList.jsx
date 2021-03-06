import { useState, useEffect } from "react";
import { fetchArticles } from "../utils/api";
import ArticleCard from "./ArticleCard.jsx";
import IncrementButton from "./IncrementButton";
import { useParams } from "react-router-dom";
import SortedBy from "./SortedBy";
import Order from "./Order";
import handleErrorMessage from "../utils/handle-error-message";
import ErrorComponent from "./ErrorComponent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function ArticleList() {
  const { topic } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hideIncButton, sethideIncButton] = useState(false);
  const [sortBy, setSortBy] = useState({
    name: "date",
    apiValue: "created_at",
  });
  const [order, setOrder] = useState({
    name: "descending",
    apiValue: "desc",
  });
  const [error, setError] = useState(null);

  //increase number of articles shown when button clicked
  const loadArticles = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const articles = await fetchArticles(
        limit,
        topic,
        sortBy.apiValue,
        order.apiValue
      );
      setArticleList(articles);
      setIsLoading(false);
      if (limit > articles.length) sethideIncButton(true);
    } catch (err) {
      setIsLoading(false);
      const customMessage =
        "loading articles failed - please reload page and try again";
      setError(handleErrorMessage(err, customMessage));
    }
  };

  // articles will re-render each time limit,topic,sortby or order changes
  useEffect(() => {
    loadArticles();
  }, [limit, topic, sortBy, order]);

  let loading = "";
  if (isLoading)
    loading = (
      <Box sx={{ display: "flex", alignSelf: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
        <ErrorComponent error={error} />
      </Typography>
    );
  return (
    <Stack justifyContent="center">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ mt: 5, ml: 1, mr: 1, mb: 2 }}
      >
        <SortedBy sortBy={sortBy} setSortBy={setSortBy} />
        <Order order={order} setOrder={setOrder} />
      </Stack>
      <Typography
        variant="h4"
        sx={{
          pt: 2,
          textTransform: "capitalize",
          fontWeight: 500,
          textAlign: "center",
          mb: 3,
        }}
      >
        {topic || `Article List`}
      </Typography>
      {loading}
      <Box maxWidth="xl" alignSelf="center">
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          {articleList.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </Grid>
      </Box>
      <IncrementButton
        setLimit={setLimit}
        name={`Articles`}
        isLoading={isLoading}
        hideIncButton={hideIncButton}
      />
    </Stack>
  );
}
