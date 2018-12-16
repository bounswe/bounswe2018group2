"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Job_updates", {
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
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: "Users", key: "id" }
            },
            type: {
                type: Sequelize.ENUM("milestone", "completion", "request")
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
        return queryInterface.dropTable("Job_updates");
    }
};
