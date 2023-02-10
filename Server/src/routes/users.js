const { Router } = require("express");
const {
  getUsersBestRating,
  getUsers,
  addUser,
  updateProfile,
  deleteProfile,
  getUserById
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/rating", getUsersBestRating);
router.post("/add", addUser);
router.patch("/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
