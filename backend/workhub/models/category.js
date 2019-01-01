'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.hasMany(models.Job_category, {
        foreignKey: "category_id",
        as: "Categoryfields",
        targetKey: "id"
    });
  };
  return Category;
};