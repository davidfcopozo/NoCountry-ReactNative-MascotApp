const { Router } = require("express");
const usersRoute = require("./users");
const newsRoute = require("./news");
const petTypesRoute = require("./petTypes");
const categoriesRoute = require("./categories");
const petsRoute = require("./pets");

const router = Router();

router.use("/users", usersRoute);
router.use("/news", newsRoute);
router.use("/petTypes", petTypesRoute);
router.use("/categories", categoriesRoute);
router.use("/pets", petsRoute);

module.exports = router;
