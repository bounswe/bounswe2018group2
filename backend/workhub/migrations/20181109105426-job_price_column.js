'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn(
      'Jobs',
      'price',
     Sequelize.INTEGER()
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'Jobs',
      'price'
    );
  }
};
