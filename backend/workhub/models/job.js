'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    client_id: DataTypes.INTEGER,
    header: DataTypes.STRING,
    description: DataTypes.STRING,
    duedate: DataTypes.DATE
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
  };
  return Job;
};