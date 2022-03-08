import axios from "axios";

const apiLink = "https://northcoders-news-api.herokuapp.com/api";

const fetchArticles = async (limit, topic) => {
  let queryString = `?limit=${limit}`;
  if (topic) queryString += `&topic=${topic}`;
  const {
    data: { articles },
  } = await axios.get(`${apiLink}/articles${queryString}`);
  return articles;
};

const fetchTopics = async () => {
  const {
    data: { topics },
  } = await axios.get(`${apiLink}/topics`);
  return topics;
};

const fetchArticle = async (articleId) => {
  const {
    data: { article },
  } = await axios.get(`${apiLink}/articles/${articleId}`);
  return article;
};

export { fetchArticles, fetchTopics, fetchArticle };
