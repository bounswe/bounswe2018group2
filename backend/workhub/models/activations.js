'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activations = sequelize.define('Activations', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  Activations.associate = function(models) {
    Activations.belongsTo(models.User, {as: "user", foreignKey: "user_id", targetKey: "id"});
  };
  return Activations;
};