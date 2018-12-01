"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Job_biddings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            job_id: {
                type: Sequelize.INTEGER,
                references: { model: "Jobs", key: "id" }
            },
            freelancer_id: {
                type: Sequelize.INTEGER,
                references: { model: "Users", key: "id" }
            },
            amount: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Job_biddings");
    }
};
