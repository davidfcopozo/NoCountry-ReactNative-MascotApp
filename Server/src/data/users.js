const axios = require("axios").default;

const getUsersFromApi = async () => {
  const { data } = await axios.get("https://apimocha.com/mascot-app/users");
  return data;
};

module.exports = getUsersFromApi;
