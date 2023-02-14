const { Router } = require("express");
const {
  getUsersBestRating,
  getUsers,
  addUser,
  updateProfile,
  deleteProfile,
  getUserById,
  getUsersByCategory,
  getUsersByFilter,
  getUserFavorites,
  deleteFavorite,
  addUserFavorites
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/favorites/:id/:page", getUserFavorites);
router.get("/rating", getUsersBestRating);
router.get("/category", getUsersByCategory);
router.get("/filter", getUsersByFilter);
router.post("/add", addUser);
router.post("/favorites/:id/:favorite", addUserFavorites);
router.patch("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.delete("/favorites/:id/:favorite", deleteFavorite);
router.get("/:id", getUserById);

module.exports = router;
