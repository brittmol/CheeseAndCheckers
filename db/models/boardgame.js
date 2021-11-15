'use strict';
module.exports = (sequelize, DataTypes) => {
  const BoardGame = sequelize.define('BoardGame', {
    title: DataTypes.STRING,
    summary: DataTypes.TEXT,
    company: DataTypes.STRING
  }, {});
  BoardGame.associate = function(models) {
    // associations can be defined here
  };
  return BoardGame;
};