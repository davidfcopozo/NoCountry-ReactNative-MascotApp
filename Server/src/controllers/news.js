const { News } = require("../db");

const getNews = async (req, res, next) => {
  try {
    const newsList = await News.findAll();
    return res.status(200).json(newsList);
  } catch (error) {
    next(error);
  }
};

module.exports = { getNews };
