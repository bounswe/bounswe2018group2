'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    queryInterface.addColumn(
      'Users',
      'type',
     Sequelize.ENUM('freelancer', 'client')
    );
    queryInterface.addColumn(
      'Users',
      'profile_image_id',
     Sequelize.INTEGER
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    queryInterface.removeColumn(
      'type',
      'profile_image_id',
    );
  }
}