"use strict";
module.exports = (sequelize, DataTypes) => {
    const Job_update = sequelize.define(
        "Job_update",
        {
            job_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            type: DataTypes.ENUM("milestone", "completion", "request"),
            description: DataTypes.STRING
        },
        {}
    );
    Job_update.associate = function(models) {
        Job_update.belongsTo(models.User, {
            foreignKey: "user_id",
            targetKey: "id"
        });
        Job_update.belongsTo(models.Job, {
            foreignKey: "job_id",
            as: "Job",
            targetKey: "id"
        });
    };
    return Job_update;
};
