const { Router } = require("express");
const { getUsersBestRating } = require("../controllers/users");

const router = Router();

router.get("/rating", getUsersBestRating);

module.exports = router;
