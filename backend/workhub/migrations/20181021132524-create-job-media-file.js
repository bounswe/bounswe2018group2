'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Job_media_files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Jobs', key: 'id' }
      },
      media_file_id: {
        type: Sequelize.INTEGER,
        references: { model: 'media_files', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Job_media_files');
  }
};