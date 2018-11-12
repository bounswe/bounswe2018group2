'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    client_id: DataTypes.INTEGER,
    header: DataTypes.STRING,
    description: DataTypes.STRING,
    duedate: DataTypes.DATE,
    price: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    Job.belongsToMany(models.Category, {through:'Job_category', foreignKey: 'job_id'});
  };
  return Job;
};