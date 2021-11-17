'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'GameShelves',
      [
        {
          shelfName: "family",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          shelfName: "strategy",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('GameShelves', null, {});
  }
};
