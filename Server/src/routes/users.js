const { Router } = require("express");
const {
  getUsersBestRating,
  getUsers,
  addUser,
  updateProfile,
  deleteProfile,
  getUserById,
  getUsersByCategory
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/rating", getUsersBestRating);
router.get("/category", getUsersByCategory);
router.post("/add", addUser);
router.patch("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.get("/:id", getUserById);

module.exports = router;
