import axios from "axios";

const apiLink = "https://northcoders-news-api.herokuapp.com/api";

const fetchArticles = async (limit, topic) => {
  const {
    data: { articles },
  } = await axios.get(`${apiLink}/articles`, {
    params: {
      limit,
      topic,
    },
  });
  return articles;
};

const fetchTopics = async () => {
  const {
    data: { topics },
  } = await axios.get(`${apiLink}/topics`);
  return topics;
};

const patchVotes = async (articleId, increment) => {
  const {
    data: {
      article: { votes },
    },
  } = await axios.patch(`${apiLink}/articles/${articleId}`, {
    inc_votes: increment,
  });
  console.log(votes);
};

export { fetchArticles, fetchTopics, patchVotes };
