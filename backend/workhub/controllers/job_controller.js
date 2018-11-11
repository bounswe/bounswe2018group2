const db = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Job = db.Job;
const Job_category = db.Job_category;
const User = db.User;
const Sessions = db.Sessions;
const Profile = db.Profile;


/**
* @api {post} /job/create Create Job
* @apiVersion 0.2.0
* @apiName GetUser
* @apiGroup User
* @apiParam {Integer} client_id Mandatory
* @apiParam {String} header Mandatory
* @apiParam {String} description Mandatory
* @apiParam {Datetime} [due_date] Optional
* @apiParam {Integer} price Mandatory
* @apiParam {Integer[]} [categories] Optional
*/

exports.create = function(req, res) {
	const { client_id, header, description, due_date, price, categories } = req.body;
	console.log(client_id)
	User.findOne({
        where: { id: client_id }
    }).then(client => {
    	console.log("clientdayiz");
    	if (client) {
    		if(client.type != 'client'){
    			res.status(500).send({
                	msg: "User's type is not client."
            	});
    		} else {
    			Job.create({
                	// Job created
                	client_id: client_id,
                	header: header,
                	description: description,
                	duedate: due_date,
                	price: price
            	}).then(job =>{
            		for (i=0; i < categories.length; i++){
            			Job_category.create({
		  					job_id: job.id,
		  					category_id: categories[i]
		            	})
            		}
            		res.status(200).send({
                		msg: "Job created"
            		});
            	})
    		}
        } else {
        	res.status(400).send({
                msg: "User not found."
            });
        }
    })
}