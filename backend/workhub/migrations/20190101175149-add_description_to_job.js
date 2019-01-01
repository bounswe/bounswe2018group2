"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn("Job_updates", "description", {
            type: Sequelize.STRING,
            allowNull: true
        });
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn("Job_updates", "description");
    }
};
