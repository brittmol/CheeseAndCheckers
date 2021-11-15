'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ShelvesToGames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gamesShelfId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'GameShelves'}

      },
      boardGameId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'BoardGames'}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ShelvesToGames');
  }
};
