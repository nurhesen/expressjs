"use strict";

const Joi = require("joi");
const { LISTING_TYPE } = require("./../lib/enums");

const listingSaveSchema = Joi.object({
  id: Joi.string().uuid({ version: "uuidv4" }).required(),

  listingType: Joi.string()
    .required()
    .valid(LISTING_TYPE.BUY, LISTING_TYPE.SELL),

  currency: Joi.string().required(),

  amount: Joi.number().required(),

  minLimit: Joi.number().max(Joi.ref("amount")).min(1).required(),

  maxLimit: Joi.number()
    .max(Joi.ref("amount"))
    .min(Joi.ref("minLimit"))
    .required(),

  paymentCurrency: Joi.string().required(),

  price: Joi.number().min(1).required(),

  paymentWindow: Joi.number().integer().required().min(600),

  description: Joi.string().allow(null).allow(""),

  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null),
});

module.exports = {
  listingSaveSchema,
};
