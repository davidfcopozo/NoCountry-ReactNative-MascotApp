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
  getSearch
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/rating", getUsersBestRating);
router.get("/category", getUsersByCategory);
router.post("/register", addUser);
router.get("/filter", getUsersByFilter);
router.get("/search/:search", getSearch);
router.get("/jobOffers", getUserJobOffers);
router.get("/favorites/:id/:page", getUserFavourites);
router.post("/favorites/:id/:favorite", addUserFavourites);
router.delete("/favorites/:id/:favorite", deleteFavourite);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

module.exports = router;
