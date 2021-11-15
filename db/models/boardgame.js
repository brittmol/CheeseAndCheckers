"use strict";
module.exports = (sequelize, DataTypes) => {
  const BoardGame = sequelize.define(
    "BoardGame",
    {
      title: DataTypes.STRING,
      summary: DataTypes.TEXT,
      company: DataTypes.STRING,
    },
    {}
  );
  BoardGame.associate = function (models) {
    BoardGame.hasMany(models.Review, { foreignKey: "boardGameId" });

    columnMapping1 = {
      through: "shelvesToGame",
      otherKey: "gameShelfId",
      foreignKey: "boardGameId",
    };
    BoardGame.belongsToMany(models.GameShelf, columnMapping1);

    columnMapping2 = {
      through: "categoriesToGame",
      otherKey: "categoryId",
      foreignKey: "boardGameId",
    };

    BoardGame.belongsToMany(models.Category, columnMapping2);
  };
  return BoardGame;
};
