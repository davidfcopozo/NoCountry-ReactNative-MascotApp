const getUsersFromApi = require("../data/users");
const { User } = require("../db");

const setUsersDB = async () => {
  try {
    const usersData = await getUsersFromApi();
    await User.bulkCreate(usersData);
    return { message: "The users have been successfully set on DB" };
  } catch (error) {
    console.log(error);
  }
};

module.exports = setUsersDB;
