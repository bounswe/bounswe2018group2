'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job_annotations = sequelize.define('Job_annotations', {
    job_id: DataTypes.INTEGER,
    text: DataTypes.STRING,
    position_x: DataTypes.INTEGER,
    position_y: DataTypes.INTEGER
  }, {});
  Job_annotations.associate = function(models) {
    // associations can be defined here
  };
  return Job_annotations;
};