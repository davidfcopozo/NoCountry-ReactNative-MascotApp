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
router.get("/login/:id", login);
router.get("/filter", getUsersByFilter);
router.get("/search", getSearch);
router.get("/jobOffers", decodeToken, getUserJobOffers);
router.get("/favorites/:id/:page", decodeToken, getUserFavourites);
router.post("/favorites/:id/:favorite", decodeToken, addUserFavourites);
router.delete("/favorites/:id/:favorite", decodeToken, deleteFavourite);
router.patch("/:id", decodeToken, updateUser);
router.delete("/:id", decodeToken, deleteUser);
router.get("/:id", decodeToken, getUserById);
router.post("/review/:id", decodeToken, addUserReview);

module.exports = router;
