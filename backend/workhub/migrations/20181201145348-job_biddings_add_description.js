"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn(
            "Job_biddings",
            "description",
            Sequelize.STRING
        );
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn("Job_biddings", "description");
    }
};
