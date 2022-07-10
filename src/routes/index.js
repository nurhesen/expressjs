"use strict";

const router = require("express").Router();

const { version: apiVersion } = require("../../package");
const listingsRouter = require("./listings");
const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");
const usersRouter = require("./users");
const authRouter = require("./auth");

router.get("/", (req, res) => {
  res.send(`API v${apiVersion}`);
});
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use(authentication);
router.use("/listings", listingsRouter);
router.use(errorHandler);

module.exports = router;
