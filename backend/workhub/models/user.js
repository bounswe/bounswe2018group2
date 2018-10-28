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
  },

  type: {
    type: DataTypes.ENUM('freelancer', 'client'),
    validate: {
      notEmpty: true
    }
  },

  profile_image_id: {
    type: DataTypes.INTEGER
  }

  }, {});
  User.associate = function(models) {
	User.hasOne(models.Profile, {foreignKey: 'user_id', targetKey:'id', as:'user'})
  };
  return User;
};