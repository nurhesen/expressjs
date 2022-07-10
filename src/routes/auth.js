"use strict";

const router = require("express").Router();

const validateSchema = require("./middlewares/validateSchema");
const { loginUserSchema } = require("../schemas/loginUser");
const { login } = require("../services/auth");

router.post(
  "/login",
  validateSchema(loginUserSchema),
  async (req, res, next) => {
    try {
      const result = await login(req.body);

      return result ? res.status(200).json(result) : next({ status: 401 });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
