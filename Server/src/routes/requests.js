const Router = require("express");
const { createRequest, getUserRequests } = require("../controllers/requests");

const router = Router();

router.get("/", getUserRequests);
router.post("/create", createRequest);

module.exports = router;
