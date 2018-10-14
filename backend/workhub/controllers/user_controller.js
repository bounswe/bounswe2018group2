const db = require('../models');
const user = db.User;

exports.create = function (req, res) {
	const { email, firstName, lastName, password } = req.body;
	//console.log(req.body);
	//console.log('so far so good');
	
	user.findOne({
		where: {email: email}
	}).then(users => {
		console.log('searched the database');
		if (users){
			res.status(400).send({
				msg: "This e-mail has already been registered."
			})
		} else {
			console.log('no clashes');
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
				console.log('oh shit');
				res.status(500).json({
					msg: "Something bad happened."
				})
			})
		}
	})
} 