"use strict";

const Joi = require("joi");
const { DataTypes } = require("sequelize");
const db = require("../lib/db")();
const { listingSaveSchema } = require("../schemas/listing");

module.exports = db.define(
  "Listing",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    listingType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minLimit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxLimit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentWindow: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "listings",
    validate: {
      validateSchema() {
        listingSaveSchema
          .keys({
            userId: Joi.string().uuid({ version: "uuidv4" }).required(),
          })
          .validate(this);
      },
    },
  }
);
