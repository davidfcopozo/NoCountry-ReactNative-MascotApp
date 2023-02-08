const axios = require("axios").default;

const getUsersBestRating = async (req, res, next) => {
  try {
    const { data } = await axios.get("https://apimocha.com/mascot-app/users");
    const usersWithRating = data.filter(user => user.rating !== null);
    usersWithRating.sort((a, b) => b.rating - a.rating);
    res.status(200).json(usersWithRating);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsersBestRating };
