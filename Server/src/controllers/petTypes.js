const { PetType } = require("../db");

const getPetTypes = async (req, res, next) => {
  try {
    const petTypesList = await PetType.findAll();
    return res.status(200).json(petTypesList);
  } catch (error) {
    next(error);
  }
};

module.exports = { getPetTypes };
