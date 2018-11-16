'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Users',
      'activated',
     Sequelize.BOOLEAN
    );
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn(
      'Users',
      'activated',
    );
  }
};
