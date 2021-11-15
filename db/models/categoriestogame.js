'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoriesToGame = sequelize.define('CategoriesToGame', {
    categoryId: DataTypes.INTEGER,
    boardGameId: DataTypes.INTEGER
  }, {});
  CategoriesToGame.associate = function(models) {
    // associations can be defined here
  };
  return CategoriesToGame;
};