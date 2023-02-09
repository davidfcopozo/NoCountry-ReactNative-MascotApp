const getPetTypesFromApi = require("../data/petTypes");
const { PetType } = require("../db");

const setPetTypesDB = async () => {
  try {
    const petTypesData = await getPetTypesFromApi();
    await PetType.bulkCreate(petTypesData);
    return { message: "The pet types have been successfully set on DB" };
  } catch (error) {
    console.log(error);
  }
};

module.exports = setPetTypesDB;
