const getNewsFromApi = require("../data/news");
const { News } = require("../db");

const setNewsDB = async () => {
  try {
    const newsData = await getNewsFromApi();
    await News.bulkCreate(newsData);
    return { message: "The news have been successfully set on DB" };
  } catch (error) {
    console.log(error);
  }
};

module.exports = setNewsDB;
