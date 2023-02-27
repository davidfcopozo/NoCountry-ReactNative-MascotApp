require("dotenv").config();
const server = require("./src/app");
const { conn, User } = require("./src/db");

const setUsersDB = require("./src/seed/users");
const setCategoriesDB = require("./src/seed/categories");
const setPetTypesDB = require("./src/seed/petTypes");
const setNewsDB = require("./src/seed/news");
const setUserCategoryDB = require("./src/seed/user_categories");

const { PORT } = process.env;

console.log("Connecting to database. Please wait a few seconds...");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT || 3002, () => {
    User.findAll()
      .then(users => {
        if (users.length === 0) {
          setPetTypesDB().then(data => console.log(data));
          setNewsDB().then(data => console.log(data));
          setUsersDB().then(data => {
            console.log(data);
            setCategoriesDB().then(data => {
              console.log(data);
              setUserCategoryDB().then(data => {
                console.log(data);
                console.log("The database has been set up successfully!");

                PORT
                  ? console.log(`Server listening at port ${PORT}.`)
                  : console.log("Server listening at port 3002.");
              });
            });
          });
        } else {
          PORT
            ? console.log(`Server listening at port ${PORT}.`)
            : console.log("Server listening at port 3002.");
        }
      })
      .catch(error => console.log("Preloading database error: ", error));
  });
});
