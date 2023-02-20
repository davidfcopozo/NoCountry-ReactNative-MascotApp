const { Pet } = require("../db");
const { isValidNumber } = require("./../validations/index");

const getUserPets = async (req, res) => {
  try {
    const petList = await Pet.findAll();
    return res.status(200).json(petList);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const getPetInfo = async (req, res) => {
  const { id } = req.params;
  if (isValidNumber(id)) {
    res.status(400).json({ message: "id must be a number", id: id });
  }
  try {
    const petInfo = await Pet.findOne({
      where: { id }
    });
    return res.status(200).json(petInfo);
  } catch (err) {
    return res.status(500).json({
      error: err.message
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

    return res.status(200).json({ pet: newPet.dataValues });
  } catch (err) {
    return res.status(500).json({ errorMessage: err.message, body: req.body });
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
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserPets, getPetInfo, addPet, updatePet, deletePet };
