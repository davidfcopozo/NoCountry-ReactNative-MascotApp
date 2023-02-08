const getCategoriesFromApi = require("../data/categories");
const { Category } = require("../db");

const setCategoriesDB = async () => {
  try {
    const categoriesData = await getCategoriesFromApi();
    await Category.bulkCreate(categoriesData);
    return { message: "The categories have been successfully set on DB" };
  } catch (error) {
    console.log(error);
  }
};

module.exports = setCategoriesDB;
