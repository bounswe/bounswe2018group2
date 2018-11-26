'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    message_type: DataTypes.ENUM('status','custom'),
    isRead: DataTypes.BOOLEAN
  }, {});
  Notifications.associate = function(models) {
    // associations can be defined here
  };
  return Notifications;
};