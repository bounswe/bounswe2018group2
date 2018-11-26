'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Notifications',
      'message_type',
     Sequelize.ENUM('status', 'custom')
    );
    queryInterface.addColumn(
      'Notifications',
      'isRead',
     Sequelize.BOOLEAN()
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Notifications',
      'message_type',
    ).then(function () {
      return queryInterface.removeColumn(
        'Notifications',
        'isRead',
      );
    });
  }
};
