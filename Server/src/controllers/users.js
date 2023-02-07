const axios = require("axios").default;
const { Recipe, Diet } = require("../db.js");
const { Op } = require("sequelize");

const getUsersBestRating = async (req, res, next) => {
  try {
    const fetchingUsers = await axios.get("https://apimocha.com/mascot-app/users");
    const usersArray = fetchingUsers.data;
    const usersWithRating = usersArray.filter(user => user.rating !== null);
    usersWithRating.sort((a, b) => b.rating - a.rating);
    res.status(200).json(usersWithRating);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsersBestRating };
