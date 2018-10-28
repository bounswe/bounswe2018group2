'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    user_id: DataTypes.INTEGER,
    user_token: DataTypes.STRING
  }, {});
  Sessions.associate = function(models) {
    // associations can be defined here
  };
  return Sessions;
};