const { Router } = require("express");
const {
  getUsersBestRating,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsersByCategory,
  getUsersByFilter,
  getUserFavourites,
  deleteFavourite,
  addUserFavourites,
  getUserJobOffers,
  getSearch,
  singInUser
} = require("../controllers/users");
const decodeToken = require("../middleware");

const router = Router();

// El middleware decodeToken se aplica a determinadas rutas (son las que se necesita estar logueado para poder acceder)
router.get("/", decodeToken, getUsers);
router.get("/rating", getUsersBestRating);
router.get("/category", getUsersByCategory);
router.post("/register", addUser);
router.get("/filter", getUsersByFilter);
router.get("/search", getSearch);
router.get("/jobOffers", getUserJobOffers);
router.get("/favorites/:id/:page", getUserFavourites);
router.post("/favorites/:id/:favorite", addUserFavourites);
router.delete("/favorites/:id/:favorite", deleteFavourite);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.get("/signin/:id", singInUser);


module.exports = router;
