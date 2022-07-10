"use strict";
const Joi = require("joi");

const loginUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password:
    Joi.string()
    .required(),
});

module.exports = { loginUserSchema };
