import axios from "axios";

const apiLink = "https://northcoders-news-api.herokuapp.com/api";

const fetchArticles = async (limit) => {
  const {
    data: { articles },
  } = await axios.get(`${apiLink}/articles?limit=${limit}`);
  return articles;
};

const fetchTopics = async () => {
  const {
    data: { topics },
  } = await axios.get(`${apiLink}/topics`);
  return topics;
};

export { fetchArticles, fetchTopics };
