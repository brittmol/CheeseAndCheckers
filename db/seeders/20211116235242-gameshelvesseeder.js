"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "GameShelves";
    return queryInterface.bulkInsert(options, [
      {
        shelfName: "Want to Play",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shelfName: "Played",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shelfName: "Favorites",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shelfName: "Family",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shelfName: "Strategy",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        shelfName: "Party Games",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "GameShelves";
    return queryInterface.bulkDelete(options);
  },
};
