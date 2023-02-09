const { Router } = require("express");
const { getNews } = require("../controllers/news");

const router = Router();

router.get("/", getNews);

module.exports = router;
