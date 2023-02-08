const { Category } = require("../db");

const getCategories = async (req, res, next) => {
  try {
    const categoriesList = await Category.findAll();
    return res.status(200).json(categoriesList);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories };
