'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Notifications', 'message_type', {
        type: Sequelize.ENUM('status', 'bid_get', 'bid_accept', 'bid_reject', 'custom'),
        allowNull: false
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Notifications', 'message_type', {
        type: Sequelize.ENUM('status', 'custom'),
        allowNull: false
      });
  }
};
