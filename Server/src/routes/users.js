const { Router } = require("express");
const {
  getUsersBestRating,
  getUsers,
  register,
  login,
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
  addUserReview
} = require("../controllers/users");
const decodeToken = require("../middleware");

const router = Router();

// El middleware decodeToken se aplica a determinadas rutas (son las que se necesita estar logueado para poder acceder)
router.get("/", decodeToken, getUsers);
router.get("/rating", getUsersBestRating);
router.get("/category", getUsersByCategory);
router.post("/register", register);
router.get("/login", login);
router.get("/filter", getUsersByFilter);
router.get("/search", getSearch);
router.get("/jobOffers", getUserJobOffers);
router.get("/favorites/:id/:page", getUserFavourites);
router.post("/favorites/:id/:favorite", addUserFavourites);
router.delete("/favorites/:id/:favorite", deleteFavourite);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.post("/review/:id", addUserReview);

module.exports = router;
