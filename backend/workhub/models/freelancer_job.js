'use strict';
module.exports = (sequelize, DataTypes) => {
  const Freelancer_job = sequelize.define('Freelancer_job', {
    user_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    finish_date: DataTypes.DATE
  }, {});
  Freelancer_job.associate = function(models) {
    // associations can be defined here
  };
  return Freelancer_job;
};