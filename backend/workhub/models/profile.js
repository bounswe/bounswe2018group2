'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    rating: DataTypes.FLOAT
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
  };
  return Profile;
};