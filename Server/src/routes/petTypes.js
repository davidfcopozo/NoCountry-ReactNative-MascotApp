const { Router } = require("express");
const { getPetTypes } = require("../controllers/petTypes");

const router = Router();

router.get("/", getPetTypes);

module.exports = router;
