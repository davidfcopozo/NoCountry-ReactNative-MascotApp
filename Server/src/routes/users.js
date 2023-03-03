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
  deleteUserFavourites,
  addUserFavourites,
  getSearch,
  resetPassword,
  getUsersSameCity
} = require("../controllers/users");
// const decodeToken = require("../middleware");

const router = Router();

// El middleware decodeToken se aplica a determinadas rutas (son las que se necesita estar logueado para poder acceder)

router.get("/", getUsers); // ,decodeToken
router.post("/register", register);
router.post("/login", login);
router.get("/city/:city/:id", getUsersSameCity); // ,decodeToken
router.get("/rating", getUsersBestRating);
router.get("/category", getUsersByCategory);
router.get("/filter", getUsersByFilter);
router.get("/search", getSearch);
router.get("/favourites/:id", getUserFavourites); // ,decodeToken
router.post("/favourites/:id/:favourite", addUserFavourites); // ,decodeToken
router.delete("/favourites/:id/:favourite", deleteUserFavourites); // ,decodeToken
router.patch("/:id", updateUser); // ,decodeToken
router.delete("/:id", deleteUser); // ,decodeToken
router.get("/:id", getUserById); // ,decodeToken
router.put("/password", resetPassword); // ,decodeToken

module.exports = router;
