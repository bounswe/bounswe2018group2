const db = require('../models');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const user = db.User;
const sessions = db.Sessions;
const profile = db.Profile;

const saltRounds = 10;

exports.create = function (req, res) {
	const { email, firstName, lastName, password, type } = req.body;
	
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
				password: hashedpass,
				type: type
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

     				var token = crypto.randomBytes(48).toString('hex');

     				sessions.findOne({
     					//check if a user session already exists
     					where: {
     						user_id : users.id
     					}
     				}).then(sess => {
     					//if so, update it
     					if (sess) {
     						sess.updateAttributes({
     							user_token : token
     						})
     					//otherwise, create it
     					}else{
     						sessions.create({
     							user_id : users.id,
     							user_token : token
     						})
     					}
     				})		

     				res.status(200).send({
						msg: "Logged in successfully.",
						token: token
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


exports.profileInfo = function(req,res){
	var user_id = req.params.userId;



	var firstName;
	var lastName;
	var desc;
	var rating;

	profile.findOne({
		where: {user_id : user_id},
		include: [{
			model: user,
			as: 'user',
			where: {id : user_id}
		}]
	}).then(info => {
		if (info){
			firstName = info.user.firstName;
			lastName = info.user.lastName;
			desc = info.description;
			rating = info.rating;

			console.log(desc);

			res.status(200).send({
				firstName: firstName,
				lastName: lastName,
				description: desc,
				rating: rating,
				msg: "User found successfully."
			})
		}else{
			res.status(400).send({
				msg: "User not found."
			})
		}
	})

}