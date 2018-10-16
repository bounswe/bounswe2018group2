'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
	firstName: {
		type: DataTypes.STRING,
		validate:{
			notEmpty: true
		}
	},

	lastName: {
		type: DataTypes.STRING,
		validate:{
			notEmpty: true
		}
	},

	email: {
	  type: DataTypes.STRING,
	  validate:{
		isEmail: true
	  }
	},

	password: {
	  type: DataTypes.STRING,
	  validate: {
	  	len: {
	  		args: [8,64],
	  		msg: "Password has to be between 8 and 64 characters."
	  	}
	  }
	}

  }, {});
  User.associate = function(models) {
	// associations can be defined here
  };
  return User;
};