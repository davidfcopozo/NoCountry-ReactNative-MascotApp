const Router = require("express");
const { getUserReviews, createReview } = require("../controllers/reviews");

const router = Router();

router.get("/", getUserReviews);
router.post("/create/:id", createReview);

module.exports = router;
