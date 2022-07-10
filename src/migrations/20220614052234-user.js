"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        charset: "utf8",
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
