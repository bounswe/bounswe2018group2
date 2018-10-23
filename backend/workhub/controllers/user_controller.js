const db = require('../models');
const bcrypt = require('bcryptjs');
const user = db.User;

const saltRounds = 10;

exports.create = function (req, res) {
	const { email, firstName, lastName, password } = req.body;
	
	//see if that email already exists.
	user.findOne({
		where: {email: email}
	}).then(users => {
		console.log('searched the database');
		if (users){
			res.status(500).send({
				msg: "This e-mail has already been registered."
			})
		} else {
			console.log('no email clashes with existing data');

			var salt = bcrypt.genSaltSync(saltRounds);
			var hashedpass = bcrypt.hashSync(password, salt);

			console.log(hashedpass);
			console.log("The fuck?");

			user.create({
				//don't even think about shortening this, it caused so much stupid shit that I need to make it 200% clear
				email: email,
				firstName: firstName,
				lastName: lastName,
				password: hashedpass
			}).then(users => {
				console.log('Bitchin\'!');
				res.send({
					msg: "User successfully created."
				})
			}).catch(e => {
				console.log(e);
				res.status(500).json({
					msg: "Something bad happened."
				})
			})
		}
	})
} 

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  user.findOne({
		where: {email: email}
	}).then(users => {
		
		if (users){
			
     		bcrypt.compare(req.body.password, users.password, function (err, result) {
				
     			if(result == true){
     				res.status(200).send({
						msg: "Logged in successfully."
            		})
      			}
     	 		else if(result == false){
    		 		res.status(500).send({
						msg: "E-mail and password does not match."
           			})        			
      			}
      		})			
		} else {
			res.status(500).send({
				msg: "This e-mail does not exist."
			})

		}

	})

}