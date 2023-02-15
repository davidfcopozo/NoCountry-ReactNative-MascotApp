const { User, Auth, Category } = require("../db");

const getUsers = async (req, res) => {
  try {
    const usersList = await User.findAll();
    return res.status(200).json(usersList);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userById = await User.findByPk(id);
    !userById
      ? res.status(404).json({ errorMessage: "There is no user with that id" })
      : res.status(200).json(userById.dataValues);
  } catch (error) {
    error.original.code === "22P02"
      ? res.status(400).json({ errorMessage: "The id type must be an integer" })
      : res.status(500).json({
          errorMessage: error.original
        });
  }
};

const getUsersBestRating = async (req, res) => {
  try {
    const usersList = await User.findAll();
    const usersWithRating = usersList.filter(user => user.rating !== 0);
    usersWithRating.sort((a, b) => b.rating - a.rating);
    return res.status(200).json(usersWithRating);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original
    });
  }
};

const getUsersByCategory = async (req, res) => {
  const { categoryId } = req.body;

  try {
    if (!categoryId) return res.status(400).json({ errorMessage: "CategoryId missing" });
    if (typeof categoryId !== "number")
      return res.status(400).json({ errorMessage: "The categoryId type must be an integer" });

    const category = await Category.findByPk(categoryId);
    if (category === null)
      return res.status(404).json({ errorMessage: "The is no category with that id" });

    const usersThatOfferServices = await User.findAll({
      where: { offers_services: true },
      include: Category
    });

    const usersArray = usersThatOfferServices.map(user => user.dataValues);

    const usersToShow = [];
    for (let user of usersArray) {
      for (let u of user.categories) {
        if (u.id === categoryId) {
          usersToShow.push(user);
        }
      }
    }

    if (!usersToShow.length)
      return res
        .status(404)
        .json({ message: `There is no users that offer ${category.dataValues.name}` });

    return res.status(200).json(usersToShow);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original
    });
  }
};

/* Necesita Cambios - solo se uso para testear editar perfil */
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, surname, age, city, offers_services, description, profile_pic } = req.body;

  try {
    await User.update(
      {
        name,
        surname,
        age,
        city,
        offers_services,
        description,
        profile_pic
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
    return res.status(500).json({ errorMessage: error.original });
  }
};

const addUser = async (req, res) => {
  const {
    name,
    surname,
    age,
    city,
    offers_services,
    description,
    rating,
    profile_pic,
    email,
    password,
    isGoogle
  } = req.body;

  try {
    let auth = await Auth.create({
      email,
      password,
      isGoogle
    });

    let newUser = await User.create({
      name,
      surname,
      age,
      city,
      offers_services,
      description,
      rating,
      profile_pic,
      authId: auth.id
    });

    return res.json({ user: newUser });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original
    });
  }
};

/* Funcion de prueba */

const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    await Auth.destroy({
      where: {
        id
      }
    });

    await User.destroy({
      where: {
        id
      }
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original });
  }
};

module.exports = {
  getUsersBestRating,
  getUsers,
  addUser,
  updateProfile,
  deleteProfile,
  getUserById,
  getUsersByCategory
};
