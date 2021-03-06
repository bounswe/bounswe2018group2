"use strict";
module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define(
        "Job",
        {
            client_id: DataTypes.INTEGER,
            header: DataTypes.STRING,
            description: DataTypes.STRING,
            duedate: DataTypes.DATE,
            price: DataTypes.INTEGER,
            duration: DataTypes.INTEGER,
            bidding_status: {
                type: DataTypes.ENUM("open", "closed"),
                defaultValue: "open"
            },
            status: {
                type: DataTypes.ENUM(
                    "bidding",
                    "in-progress",
                    "waiting-payment",
                    "completed"
                ),
                defaultValue: "bidding"
            }
        },
        {}
    );
    Job.associate = function(models) {
        Job.hasMany(models.Job_category, {
            foreignKey: "job_id",
            as: "Jobfields",
            targetKey: "id"
        });
        Job.belongsTo(models.User, {
            foreignKey: "client_id",
            as: "Client",
            targetKey: "id"
        });
    };
    return Job;
};
