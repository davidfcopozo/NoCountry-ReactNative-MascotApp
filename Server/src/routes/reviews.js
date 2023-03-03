const Router = require("express");
const { getUserReviews, createReview } = require("../controllers/reviews");

const router = Router();

router.get("/:id", getUserReviews);
router.post("/create/:id", createReview);

module.exports = router;
