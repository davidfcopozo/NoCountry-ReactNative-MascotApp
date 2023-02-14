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
  getUserJobOffers
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/rating", getUsersBestRating);
router.get("/category", getUsersByCategory);
router.get("/filter", getUsersByFilter);
router.get("/jobOffers", getUserJobOffers);
router.get("/favorites/:id/:page", getUserFavourites);
router.post("/favorites/:id/:favorite", addUserFavourites);
router.delete("/favorites/:id/:favorite", deleteFavourite);
router.post("/add", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

module.exports = router;
