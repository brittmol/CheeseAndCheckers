"use strict";

const boardgame = require("./boardgame");

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      comment: DataTypes.TEXT,
      boardGameId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.BoardGame, { foreignKey: "boardGameId" });
  };
  return Review;
};
