"use strict";
module.exports = (sequelize, DataTypes) => {
    const Freelancer_category = sequelize.define(
        "Freelancer_category",
        {
            freelancer_id: DataTypes.INTEGER,
            category_id: DataTypes.INTEGER
        },
        {}
    );
    Freelancer_category.associate = function(models) {
        // associations can be defined here
        Freelancer_category.belongsTo(models.User, {
            foreignKey: "freelancer_id",
            as: "Freelancer",
            targetKey: "id"
        });
        Freelancer_category.belongsTo(models.Job, {
            foreignKey: "category_id",
            as: "Category",
            targetKey: "id"
        });
    };
    return Freelancer_category;
};
