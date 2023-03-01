const { Pet, User, PetType } = require("../db");
const { isValidNumber, isValidString } = require("./../validations/index");

const getUserPets = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId || !isValidNumber(userId))
      return res
        .status(400)
        .json({ errorMessage: "The userId is required and must be an integer" });

    const user = await User.findByPk(userId);
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    const petList = await Pet.findAll({
      where: {
        userId
      }
    });

    petList.length ? res.status(200).json(petList) : res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getPetById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id must be an integer" });

    const petInfo = await Pet.findByPk(id);
    petInfo === null
      ? res.status(404).json({ errorMessage: "There is no pet with that id" })
      : res.status(200).json(petInfo.dataValues);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const addPet = async (req, res) => {
  const { name, age, breed, weight, userId, petTypeId } = req.body;

  try {
    if (!name || !age || !breed || !weight || !userId || !petTypeId) {
      return res.status(400).json({ errorMessage: "Missing required fields" });
    }

    if (!isValidString(name) || !isValidString(breed))
      return res.status(400).json({
        errorMessage: "Name and breed fields must be string type"
      });

    if (
      !isValidNumber(age) ||
      !isValidNumber(weight) ||
      !isValidNumber(userId) ||
      !isValidNumber(petTypeId)
    )
      return res.status(400).json({
        errorMessage: "Age, weight, userId and petTypeId fields must be integers"
      });

    const user = await User.findByPk(userId);
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    const petType = await PetType.findByPk(petTypeId);
    if (petType === null)
      return res.status(404).json({ errorMessage: "There is no petType with that id" });

    const newPet = await Pet.create({
      name,
      age,
      breed,
      weight,
      userId,
      petTypeId
    });

    return res.status(201).json(newPet.dataValues);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const { name, age, breed, weight } = req.body;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id must be an integer" });

    if (!name && !age && !breed && !weight)
      return res.status(400).json({
        errorMessage: "There is nothing to update. Please, change a field first"
      });

    if ((name && !isValidString(name)) || (breed && !isValidString(breed)))
      return res.status(400).json({
        errorMessage: "Name and breed fields must be string type"
      });

    if ((age && !isValidNumber(age)) || (weight && !isValidNumber(weight)))
      return res.status(400).json({
        errorMessage: "Age and weith fields must be integers"
      });

    const pet = await Pet.findByPk(id);
    if (pet === null) return res.status(404).json({ errorMessage: "There is no pet with that id" });

    await Pet.update(
      {
        name,
        age,
        breed,
        weight
      },
      {
        where: {
          id
        }
      }
    );

    return res.status(200).json({ message: "The pet has been updated successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

const deletePet = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id must be an integer" });

    const pet = await Pet.findByPk(id);
    if (pet === null) return res.status(404).json({ errorMessage: "There is no pet with that id" });

    await Pet.destroy({
      where: {
        id
      }
    });

    return res.status(200).json({ message: "The pet has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

module.exports = { getUserPets, getPetById, addPet, updatePet, deletePet };
