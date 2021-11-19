'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'GameShelves',
      [
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
      ],
      {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('GameShelves', null, {});
  }
};
