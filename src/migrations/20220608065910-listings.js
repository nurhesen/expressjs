"use strict";
const Sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, seq) {
    return queryInterface.createTable(
      "listings",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          unique: true,
        },
        userId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
        },
        listingType: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        currency: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        amount: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        minLimit: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        maxLimit: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        paymentCurrency: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        paymentWindow: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        charset: "utf8",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("listings");
  },
};
