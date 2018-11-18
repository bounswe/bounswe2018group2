'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    client_id: DataTypes.INTEGER,
    header: DataTypes.STRING,
    description: DataTypes.STRING,
    duedate: DataTypes.DATE,
    price: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    bidding_status: DataTypes.ENUM('open', 'closed')
  }, {});
  Job.associate = function(models) {
    Job.belongsToMany(models.Category, {through:'Job_category', foreignKey: 'job_id'});
    Job.belongsTo(models.User, { foreignKey: "client_id", as: "Client", targetKey: "id" });
  };
  return Job;
};