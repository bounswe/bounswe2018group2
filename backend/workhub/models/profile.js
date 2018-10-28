'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    rating: DataTypes.FLOAT
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, {foreignKey: 'user_id', targetKey:'id', as: 'user'});
  };
  return Profile;
};