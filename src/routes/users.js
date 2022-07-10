"use strict";

const router = require("express").Router();
const { registerUserSchema } = require("../schemas/user");
const { registerUser } = require("../services/users");
const validateBodyIdMatchesParam = require("./middlewares/validateBodyIdMatchesParam");
const validateSchema = require("./middlewares/validateSchema");

router.put(
  "/:id",
  validateSchema(registerUserSchema),
  validateBodyIdMatchesParam("id"),
  (req, res, next) => {
    registerUser(req.body)
      .then((user) => {
        if (!user) {
          return next({ status: 409, message: "User already exists" });
        }
        res.status(201).json(user);
      })
      .catch(next);
  }
);

module.exports = router;
