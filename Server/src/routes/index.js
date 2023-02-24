const { Router } = require("express");
const usersRoute = require("./users");
const newsRoute = require("./news");
const petTypesRoute = require("./petTypes");
const categoriesRoute = require("./categories");
const petsRoute = require("./pets");
const jobOffersRoute = require("./jobOffers");

const router = Router();

router.use("/users", usersRoute);
router.use("/news", newsRoute);
router.use("/petTypes", petTypesRoute);
router.use("/categories", categoriesRoute);
router.use("/pets", petsRoute);
router.use("/job-offers", jobOffersRoute);

module.exports = router;
