"use strict";

const { Sequelize } = require("sequelize");
const env = require("../env");

let sequelize = null;

module.exports = () => {
  if (!sequelize) {
    sequelize = new Sequelize({
      database: env.DB_NAME,
      username: env.DB_USER,
      password: env.DB_PASSWORD,
      host: env.DB_HOSTNAME,
      port: env.DB_PORT,
      dialect: "mysql",
      logging: false,
      pool: {
        max: 2,
        min: 0,
        idle: 0,
        acquire: 3000,
        evict: 3000,
      },
    });
  }
  return sequelize;
};
