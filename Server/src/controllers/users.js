const { User, Auth, Category, Favourite, JobOffer, Review, Request } = require("../db");
const { isValidString, isValidNumber } = require("./../validations/index");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const usersList = await User.findAll();
    return res.status(200).json(usersList);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const register = async (req, res) => {
  const { name, surname, city, fb_authId, email, password, isGoogle } = req.body;

  try {
    if (!name || !surname || !city || !fb_authId || !email || !password) {
      return res.status(400).json({ errorMessage: "Missing required fields" });
    }

    if (
      !isValidString(name) ||
      !isValidString(surname) ||
      !isValidString(city) ||
      !isValidString(fb_authId) ||
      !isValidString(email) ||
      !isValidString(password)
    )
      return res.status(400).json({ errorMessage: "All fields must be string type" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [auth, created] = await Auth.findOrCreate({
      where: { id: fb_authId, email },
      defaults: {
        id: fb_authId,
        email,
        password: hashedPassword,
        isGoogle
      }
    });

    if (created) {
      const newUser = await User.create({
        name,
        surname,
        city,
        authId: auth.id
      });

      return res.status(201).json({
        message: "A new user has been authenticated and created successfully",
        user: newUser.dataValues
      });
    }

    return res.status(400).json({
      errorMessage: "There is already an account registered with that fb_authId or email",
      data: auth.dataValues
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const login = async (req, res) => {
  const { email, password, id } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ errorMessage: "Missing email and password fields" });

    if (!isValidString(email) || !isValidString(password))
      return res.status(400).json({ errorMessage: "Email and password must be string type" });

    const emailAuthenticated = await Auth.findOne({ where: { email } });
    if (emailAuthenticated === null)
      return res
        .status(404)
        .json({ errorMessage: "There is no account registered with that email" });

    const passwordsMatch = await bcrypt.compare(password, emailAuthenticated.dataValues.password);

    if (!passwordsMatch) return res.status(400).json({ errorMessage: "Invalid password" });

    const userLoggedIn = await User.findOne({
      include: {
        model: Auth,
        where: {
          id
        }
      }
    });

    return res
      .status(200)
      .json({ message: "A user has logged in successfully", user: userLoggedIn.dataValues });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id type must be an integer" });

    const userById = await User.findOne({
      where: {
        id
      }
    });
    !userById
      ? res.status(404).json({ errorMessage: "There is no user with that id" })
      : res.status(200).json(userById.dataValues);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUsersBestRating = async (req, res) => {
  try {
    const usersOrdered = await User.findAll({
      where: {
        rating: {
          [Op.gt]: 0
        }
      },
      include: {
        model: Category
      },
      order: [["rating", "DESC"]]
    });

    return res.status(200).json(usersOrdered);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUsersByCategory = async (req, res) => {
  const { categoryId } = req.body;

  try {
    if (!categoryId) return res.status(400).json({ errorMessage: "CategoryId missing" });
    if (!isValidNumber(categoryId))
      return res.status(400).json({ errorMessage: "The categoryId type must be an integer" });

    const category = await Category.findByPk(categoryId);
    if (category === null)
      return res.status(404).json({ errorMessage: "There is no category with that id" });

    const usersThatOfferServices = await User.findAll({
      where: { offers_services: true },
      include: {
        model: Category,
        through: {
          attributes: []
        }
      }
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
      errorMessage: error.original ? error.original : error
    });
  }
};

const getUserJobOffers = async (req, res) => {
  const { userId } = req.body;

  try {
    if (!userId) return res.status(400).json({ errorMessage: "UserId missing" });
    if (!isValidNumber(userId))
      return res.status(400).json({ errorMessage: "The userId type must be an integer" });

    const user = await User.findByPk(userId, { include: JobOffer });
    if (user === null)
      return res.status(404).json({ errorMessage: "There is no user with that id" });

    !user.dataValues.jobOffers.length
      ? res.status(404).json({
          errorMessage: `${user.dataValues.name} ${user.dataValues.surname} has no jobOffers to show`
        })
      : res.status(200).send(user.dataValues.jobOffers);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

const addUserReview = async (req, res) => {
  const { id } = req.params;
  const { reviewer_user_id, stars, description } = req.body;

  try {
    // Validaciones varias

    if (!isValidNumber(id))
      return res.status(400).json({ errorMessage: "The id type must be an integer" });

    if (!reviewer_user_id || !isValidNumber(reviewer_user_id))
      return res
        .status(400)
        .json({ errorMessage: "The rewiewer_user_id is required and must be an integer" });

    if (reviewer_user_id === parseInt(id))
      return res.status(400).json({ errorMessage: "A user cannot be self-reviewed" });

    if (!stars || !isValidNumber(stars) || stars < 1 || stars > 5)
      return res.status(400).json({
        errorMessage: "The stars are required and must be an integer between 1 and 5 included"
      });

    if (description && !isValidString(description))
      return res.status(400).json({ errorMessage: "Description field must be string type" });

    // Los usuarios (tanto el reseñador como el reseñado) deben existir y estar autenticados

    const userReviewed = await User.findByPk(id, { include: Auth });
    const userReviewer = await User.findByPk(reviewer_user_id, { include: Auth });

    if (!userReviewed || userReviewed?.dataValues.authId === null)
      return res.status(404).json({
        errorMessage: "The user you are trying to review does not exist or is not authenticated"
      });

    if (!userReviewer || userReviewer?.dataValues.authId === null)
      return res.status(404).json({
        errorMessage:
          "The user that is trying to give the review does not exist or is not authenticated"
      });

    // Para dejar su reseña, el reseñador debe haber contratado previamente al reseñado

    const userRequested = await Request.findOne({
      where: {
        hired_user_id: id,
        userId: reviewer_user_id
      }
    });

    if (!userRequested)
      return res.status(404).json({
        errorMessage: "The user that is trying to give the review has not hired the other user yet"
      });

    // Si todo va bien, y el proceso pasa todas las validaciones y chequeos de arriba, se emite finalmente la reseña

    const newReview = await Review.create({
      reviewer_user_id,
      description,
      stars,
      userId: id
    });

    return res.status(201).json(newReview.dataValues);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

/**
 *
 * @param {Number} req.query.filter Requires a rating value from query, the value is validated between 1 and 5 as a valid option by default returns the users with the rating of 5
 * @returns users filtered by the rating value // example query.filter 2 returns users with rating of 2
 */

const getUsersByFilter = async (req, res) => {
  const option = req.query.filter > 0 ? (req.query.filter > 5 ? 5 : req.query.filter) : 5;

  try {
    const usersFound = await User.findAll({
      where: {
        rating: option
      }
    });

    return res.status(200).json(usersFound);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

/**
 * STATUS : Testing
 * MESSAGE : is not finished yet, requires a session manager to manage the request to the database
 * Add Favorite to the current user favorites
 * @returns favorite
 */

const addUserFavourites = async (req, res) => {
  const { id, favorite } = req.params;
  console.log(id + favorite);

  const found = await Favourite.findOne({
    where: {
      fav_user_id: favorite,
      user_id_favs: id
    }
  });

  if (found) return res.status(400).json({});

  try {
    await Favourite.create({
      fav_user_id: favorite,
      user_id_favs: id
    });

    return res.json({ message: favorite + " Added to favorites of User " + id });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

/**
 * STATUS : Testing
 * MESSAGE : is not finished yet, requires a session manager to manage the request to the database
 * Gets the list of favorites of one user, only returns 10 articles by page
 * @returns favorites list
 */

const getUserFavourites = async (req, res) => {
  const { page, id } = req.params;

  try {
    const fav_list = await Favourite.findAll({
      where: {
        user_id_favs: id
      }
    });

    let ids = fav_list.map(fav => fav.fav_user_id);

    console.log(ids);

    const favourites = await User.findAll({
      where: {
        id: {
          [Op.and]: [ids]
        }
      }
    });

    //can you give me the code for filter just one property of each object in an array

    return res.json(favourites);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

/**
 *
 * @param {Object} req.body requires all the fields of body and extract the fields needed
 * then the fields of user are updated if the content is new
 * @returns the user id
 */

const updateUser = async (req, res) => {
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
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

/**
 * STATUS : Testing
 * MESSAGE : is not finished yet, requires a session manager to manage the request to the database
 * Deletes user favorite
 * @returns response of the request
 */

const deleteFavourite = async (req, res) => {
  const { favorite, id } = req.params;

  try {
    await Favourite.destroy({
      where: {
        fav_user_id: favorite,
        user_id_favs: id
      }
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

/* Funcion de prueba */

const deleteUser = async (req, res) => {
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
    return res.status(500).json({ errorMessage: error.original ? error.original : error });
  }
};

/**
 * STATUS : Testing
 * MESSAGE : is not finished yet, requires a session manager to manage the request to the database
 * Returns users filtered by city
 * @returns users list
 */

const getSearch = async (req, res) => {
  let filters = [
    req.query.walk === "true" ? 1 : false,
    req.query.care === "true" ? 2 : false,
    req.query.transport === "true" ? 3 : false,
    req.query.training === "true" ? 4 : false,
    req.query.hair === "true" ? 5 : false
  ];

  filters = filters.filter(e => e !== false);

  let searchWord, baseFilters;

  if (req.query.search) {
    searchWord = req.query.search;
    searchWord = {
      city: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("city")),
        "LIKE",
        "%" + searchWord.toLowerCase() + "%"
      )
    };
  }

  if (filters.length > 0) {
    baseFilters = { id: filters };
  }

  try {
    const users = await User.findAll({
      where: {
        [Op.and]: [searchWord],
        rating: {
          [Op.gt]: 0
        }
      },
      include: {
        model: Category,
        where: {
          [Op.and]: [baseFilters]
        }
      },
      order: [["rating", "DESC"]]
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.original ? error.original : error
    });
  }
};

module.exports = {
  getUsersBestRating,
  getUsers,
  register,
  login,
  updateUser,
  deleteFavourite,
  deleteUser,
  getUserById,
  getUsersByCategory,
  getUsersByFilter,
  getUserFavourites,
  addUserFavourites,
  getUserJobOffers,
  getSearch,
  addUserReview
};
