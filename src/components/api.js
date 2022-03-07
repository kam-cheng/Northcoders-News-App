import axios from "axios";

const apiLink = "https://northcoders-news-api.herokuapp.com/";

const fetchArticles = async (limit) => {
  const {
    data: { articles },
  } = await axios.get(`${apiLink}api/articles?limit=${limit}`);
  return articles;
};

export { fetchArticles };
