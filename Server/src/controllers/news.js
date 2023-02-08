const axios = require("axios").default;

const getNews = async (req, res, next) => {
  try {
    const { data } = await axios.get("https://apimocha.com/mascot-app/news");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getNews };
