"use strict";
module.exports = (sequelize, DataTypes) => {
  const GameShelf = sequelize.define(
    "GameShelf",
    {
      shelfName: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  GameShelf.associate = function (models) {
    GameShelf.belongsTo(models.User, { foreignKey: "userId" });

  const columnMapping = {
      through: "ShelvesToGame",
      otherKey: "boardGameId",
      foreignKey: "gameShelfId",
    };

    GameShelf.belongsToMany(models.BoardGame, columnMapping);
  };
  return GameShelf;
};
