"use strict";
module.exports = (sequelize, DataTypes) => {
    const Job_category = sequelize.define(
        "Job_category",
        {
            job_id: DataTypes.INTEGER,
            category_id: DataTypes.INTEGER
        },
        {}
    );
    Job_category.associate = function(models) {
        Job_category.belongsTo(models.Job, {
            foreignKey: "job_id",
            as: "Job",
            targetKey: "id"
        });
        Job_category.belongsTo(models.Category, {
            foreignKey: "category_id",
            as: "Category",
            targetKey: "id"
        });
    };
    return Job_category;
};
