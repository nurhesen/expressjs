"use strict";

const Joi = require("joi");

const registerUserSchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*[!\"#$%&'()\*+,\-.\\/:;<=>\?@\[\]\^_`{|}~])(?=.*[0-9])(?=.*[a-z].).{8,32}$/
    )
    .required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = { registerUserSchema };
