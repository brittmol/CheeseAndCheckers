"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      category: DataTypes.STRING,
    },
    {}
  );
  Category.associate = function (models) {
    const columnMapping = {
      through: "categoriesToGame",
      otherKey: "boardGameId",
      foreignKey: "categoryId",
    };

    Category.belongsToMany(models.BoardGame, columnMapping);
  };
  return Category;
};
