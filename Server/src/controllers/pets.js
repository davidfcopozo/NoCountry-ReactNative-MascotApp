const { Pet } = require("../db");
const { isValidNumber } = require("./../validations/index");

const getUserPets = async (req, res) => {
  const { id } = req.body;

  try {
    const petList = await Pet.findAll({
      where: {
        user_id: id
      }
    });

    return res.status(200).json(petList);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getPetInfo = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "id must be a number", id: id });

    const petInfo = await Pet.findOne({
      where: { id }
    });

    return res.status(200).json(petInfo);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const addPet = async (req, res) => {
  const { user_id, type_id, name, age, breed, weight } = req.body;

  try {
    if (!name || !type_id || !age || !breed || !weight || !user_id) {
      return res.status(400).json({ errorMessage: "Missing required fields", body: req.body });
    }

    let newPet = await Pet.create({
      user_id,
      type_id,
      name,
      age,
      breed,
      weight
    });

    return res.status(201).json({ pet: newPet.dataValues });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

const updatePet = async (req, res) => {
  const { id } = req.params;
  const { name, age, breed, weight } = req.body;

  try {
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
    )
      .then(result => res.json(result))
      .catch(err => res.json(err));
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

const deletePet = async (req, res) => {
  const { id } = req.params;

  try {
    await Pet.destroy({
      where: {
        id
      }
    });

    return res.status(204).json({ message: "Pet successfully deleted." });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

module.exports = { getUserPets, getPetInfo, addPet, updatePet, deletePet };
