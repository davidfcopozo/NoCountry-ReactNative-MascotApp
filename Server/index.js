require("dotenv").config();
const server = require("./src/app");
const { conn } = require("./src/db");

const setUsersDB = require("./src/seed/users");
const setCategoriesDB = require("./src/seed/categories");
const setPetTypesDB = require("./src/seed/petTypes");
const setNewsDB = require("./src/seed/news");

const { PORT } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT || 3002, () => {
    setUsersDB();
    setCategoriesDB();
    setPetTypesDB();
    setNewsDB();
    PORT
      ? console.log(`Server listening at port ${PORT}`)
      : console.log("Server listening at port 3002");
  });
});
