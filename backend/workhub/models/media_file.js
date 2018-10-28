'use strict';
module.exports = (sequelize, DataTypes) => {
  const media_file = sequelize.define('media_file', {
    url: DataTypes.STRING
  }, {});
  media_file.associate = function(models) {
    // associations can be defined here
  };
  return media_file;
};