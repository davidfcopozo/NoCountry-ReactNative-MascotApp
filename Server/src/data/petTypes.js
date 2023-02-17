const axios = require("axios").default;

const getPetTypesFromApi = async () => {
  const { data } = await axios.get("https://apimocha.com/mascot-app/pet-types");
  return data;
};

module.exports = getPetTypesFromApi;
