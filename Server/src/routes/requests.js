const Router = require("express");
const { createRequest, getUserRequests } = require("../controllers/requests");

const router = Router();

router.post("/create", createRequest);
router.get("/:userId", getUserRequests);

module.exports = router;
