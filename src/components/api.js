import axios from "axios";

const apiLink = "https://northcoders-news-api.herokuapp.com/";

const fetchArticles = async () => {
  const {
    data: { articles },
  } = await axios.get(`${apiLink}api/articles`);
  return articles;
};

export { fetchArticles };
