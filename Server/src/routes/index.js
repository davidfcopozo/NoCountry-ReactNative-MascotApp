const { Router } = require("express");
const usersRoute = require("./users");
const newsRoute = require("./news");
const petTypesRoute = require("./petTypes");
const categoriesRoute = require("./categories");
const petsRoute = require("./pets");
const jobOffersRoute = require("./jobOffers");
const requestsRoute = require("./requests");
const reviewsRoute = require("./reviews");

const router = Router();

router.use("/users", usersRoute);
router.use("/news", newsRoute);
router.use("/petTypes", petTypesRoute);
router.use("/categories", categoriesRoute);
router.use("/pets", petsRoute);
router.use("/jobOffers", jobOffersRoute);
router.use("/requests", requestsRoute);
router.use("/reviews", reviewsRoute);

module.exports = router;
