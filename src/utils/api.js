import axios from "axios";

const apiLink = "https://northcoders-news-api.herokuapp.com/api";

const fetchArticles = async (limit, topic, sortBy, order) => {
  const {
    data: { articles },
  } = await axios.get(`${apiLink}/articles`, {
    params: {
      limit,
      topic,
      sort_by: sortBy,
      order,
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

const patchVotes = async ({ articleId, commentId, increment }) => {
  if (articleId) {
    const {
      data: {
        article: { votes },
      },
    } = await axios.patch(`${apiLink}/articles/${articleId}`, {
      inc_votes: increment,
    });
    return votes;
  } else {
    const {
      data: {
        comment: { votes },
      },
    } = await axios.patch(`${apiLink}/comments/${commentId}`, {
      inc_votes: increment,
    });
    return votes;
  }
};

const fetchArticle = async (articleId) => {
  const {
    data: { article },
  } = await axios.get(`${apiLink}/articles/${articleId}`);
  return article;
};

const fetchComments = async (limit, articleId) => {
  const {
    data: { comments },
  } = await axios.get(`${apiLink}/articles/${articleId}/comments`, {
    params: {
      limit,
    },
  });
  return comments;
};

const addComment = async ({ body, username, articleId }) => {
  const {
    data: { comment },
  } = await axios.post(`${apiLink}/articles/${articleId}/comments`, {
    username,
    body,
  });
  return comment;
};

export {
  fetchArticles,
  fetchTopics,
  fetchArticle,
  patchVotes,
  fetchComments,
  addComment,
};
