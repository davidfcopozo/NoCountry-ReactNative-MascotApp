const Router = require("express");
const {
  getUserJobOffers,
  createJobOffer,
  updateJobOffer,
  deleteJobOffer
} = require("../controllers/jobOffers");

const router = Router();

router.get("/", getUserJobOffers);
router.post("/create", createJobOffer);
router.patch("/:id", updateJobOffer);
router.delete("/:id", deleteJobOffer);

module.exports = router;
