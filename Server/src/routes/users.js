const { Router } = require("express");
const { getUsersBestRating, getUsers, addUser, updateProfile, deleteProfile} = require("../controllers/users");

const router = Router();

router.get("/rating", getUsersBestRating);
router.get("/list", getUsers);
router.post("/add", addUser);
router.patch("/:id", updateProfile);
router.delete("/:id", deleteProfile);

module.exports = router;
