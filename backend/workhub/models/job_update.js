"use strict";
module.exports = (sequelize, DataTypes) => {
    const Job_update = sequelize.define(
        "Job_update",
        {
            job_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            type: ENUM("milestone", "completion", "request")
        },
        {}
    );
    Job_update.associate = function(models) {
        // associations can be defined here
    };
    return Job_update;
};
