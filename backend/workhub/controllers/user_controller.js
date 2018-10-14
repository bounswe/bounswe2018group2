const db = require('../models');
const user = db.User;

exports.create = function (req, res) {
	const { email, firstName, lastName, password } = req.body;
	
	//see if that email already exists.
	user.findOne({
		where: {email: email}
	}).then(users => {
		console.log('searched the database');
		if (users){
			res.status(400).send({
				msg: "This e-mail has already been registered."
			})
		} else {
			console.log('no email clashes with existing data');
			user.create({
				email,
				firstName,
				lastName,
				password
			}).then(users => {
				console.log('Bitchin\'!');
				res.send({
					msg: "User successfully created."
				})
			}).catch(e => {
				console.log('Either a validation failed or something went horribly wrong.');
				res.status(500).json({
					msg: "Something bad happened."
				})
			})
		}
	})
} 