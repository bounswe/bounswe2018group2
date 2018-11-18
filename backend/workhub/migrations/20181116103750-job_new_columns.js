'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Jobs',
      'bidding_status',
     Sequelize.ENUM('open', 'closed')
    );
    queryInterface.addColumn(
      'Jobs',
      'duration',
     Sequelize.INTEGER()
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Jobs',
      'bidding_status',
      'duration'
    );
  }
};
