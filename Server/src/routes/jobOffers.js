const Router = require("express");
const { createJobOffer, updateJobOffer, deleteJobOffer } = require("../controllers/jobOffers");
const decodeToken = require("../middleware");

const router = Router();

router.post("/create", createJobOffer);
router.patch("/:id/update", updateJobOffer);
router.delete("/:id/delete", deleteJobOffer);

module.exports = router;
