const axios = require("axios").default;

const getNewsFromApi = async () => {
  const { data } = await axios.get("https://apimocha.com/mascot-app/news");
  return data;
};

module.exports = getNewsFromApi;
