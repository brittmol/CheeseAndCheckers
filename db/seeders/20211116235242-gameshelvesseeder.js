'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'GameShelves',
      [
        {
          id: 1,
          shelfName: "Want to Play",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          shelfName: "Played",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          shelfName: "Favorites",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          shelfName: "Family",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          shelfName: "Strategy",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
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
