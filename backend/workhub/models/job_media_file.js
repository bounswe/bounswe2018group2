'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job_media_file = sequelize.define('Job_media_file', {
    job_id: DataTypes.INTEGER,
    media_file_id: DataTypes.INTEGER
  }, {});
  Job_media_file.associate = function(models) {
    // associations can be defined here
  };
  return Job_media_file;
};