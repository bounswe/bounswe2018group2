"use strict";
module.exports = (sequelize, DataTypes) => {
    const Job_biddings = sequelize.define(
        "Job_biddings",
        {
            job_id: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            freelancer_id: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            amount: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            status: {
                type: DataTypes.STRING
            }
        },
        {}
    );
    Job_biddings.associate = function(models) {
        Job_biddings.belongsTo(models.User, {
            foreignKey: "freelancer_id",
            as: "Freelancer",
            targetKey: "id"
        });
        Job_biddings.belongsTo(models.Job, {
            foreignKey: "job_id",
            as: "Job",
            targetKey: "id"
        });
    };
    return Job_biddings;
};
