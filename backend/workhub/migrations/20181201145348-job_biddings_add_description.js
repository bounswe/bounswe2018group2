"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            "Job_biddings",
            "description",
            Sequelize.STRING
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Job_biddings", "description");
    }
};
