const { Router } = require("express");
const usersRoute = require("./users");
const newsRoute = require("./news");

const router = Router();

router.use("/users", usersRoute);
router.use("/news", newsRoute);

module.exports = router;
