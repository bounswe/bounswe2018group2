'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job_category = sequelize.define('Job_category', {
    job_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  Job_category.associate = function(models) {
    // associations can be defined here
  };
  return Job_category;
};