const { User, Category } = require("../db");

const setUserCategoryDB = async () => {
  try {
    const usersList = await User.findAll({ where: { offers_services: true } });

    const categoriesList = await Category.findAll();
    const categoriesArray = categoriesList.map(category => category.dataValues);

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    for (let user of usersList) {
      const index = getRandomIntInclusive(0, 4);
      await user.addCategory(categoriesArray[index].id);
    }

    return { message: "The categories have been successfully set on users in DB" };
  } catch (error) {
    next(error);
  }
};

module.exports = setUserCategoryDB;
