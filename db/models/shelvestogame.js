'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShelvesToGame = sequelize.define('ShelvesToGame', {
    gameShelfId: DataTypes.INTEGER,
    boardGameId: DataTypes.INTEGER
  }, {});
  ShelvesToGame.associate = function(models) {
    // associations can be defined here
  };
  return ShelvesToGame;
};
