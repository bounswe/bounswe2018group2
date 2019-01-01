"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn("Jobs", "status", {
            type: Sequelize.ENUM(
                "bidding",
                "in-progress",
                "waiting-payment",
                "completed"
            ),
            defaultValue: "bidding"
        });
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn("Jobs", "status");
    }
};
