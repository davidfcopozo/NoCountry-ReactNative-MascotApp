const axios = require("axios").default;

const getCategoriesFromApi = async () => {
  const { data } = await axios.get("https://apimocha.com/mascot-app/pet-services");
  return data;
};

module.exports = getCategoriesFromApi;
