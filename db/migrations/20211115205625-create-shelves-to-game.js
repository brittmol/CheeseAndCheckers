"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "ShelvesToGames",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        gameShelfId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: "GameShelves" },
        },
        boardGameId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { model: "BoardGames" },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      options
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ShelvesToGames", options);
  },
};
