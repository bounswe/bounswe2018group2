'use strict';
module.exports = (sequelize, DataTypes) => {
  const Freelancer_job = sequelize.define('Freelancer_job', {
    user_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    finish_date: DataTypes.DATE
  }, {});
  Freelancer_job.associate = function(models) {
    Freelancer_job.belongsTo(models.User, {foreignKey: "user_id", as: "Freelancer", targetKey: "id"});
    Freelancer_job.belongsTo(models.Job, {foreignKey: "job_id", as: "Job", targetKey: "id"});
  };
  return Freelancer_job;
};