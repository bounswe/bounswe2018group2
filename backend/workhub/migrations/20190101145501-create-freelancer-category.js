"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Freelancer_categories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            freelancer_id: {
                type: Sequelize.INTEGER,
                references: { model: "Users", key: "id" }
            },
            category_id: {
                type: Sequelize.INTEGER,
                references: { model: "Categories", key: "id" }
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
        return queryInterface.dropTable("Freelancer_categories");
    }
};
