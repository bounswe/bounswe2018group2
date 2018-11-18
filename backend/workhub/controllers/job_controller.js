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
* @apiName CreateJob
* @apiGroup Job
* @apiParam {Integer} client_id Mandatory
* @apiParam {String} header Mandatory
* @apiParam {String} description Mandatory
* @apiParam {Datetime} [due_date] Optional
* @apiParam {Integer} price Mandatory
* @apiParam {Integer[]} [categories] Optional
* @apiParam {Integer} duration Mandatory duration of the job in days
* @apiParam {String} [bidding status] Optional if user doesn't want any bids, send it as 'closed', otherwise 'open'
* @apiSuccess {String} msg Success message.
*/

exports.create = function(req, res) {
	const { client_id, header, description, due_date, price, categories, duration, bidding_status } = req.body;
	console.log(client_id)
	User.findOne({
        where: { id: client_id }
    }).then(client => {
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
                	price: price,
                	duration: duration,
                	bidding_status: bidding_status
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

/**
* @api {get} /job/getalljobs Get All Jobs
* @apiVersion 0.2.0
* @apiName GetAllJobs
* @apiGroup Job
* @apiSuccess {String} msg Success message.
* @apiSuccess {Object[]} jobs List of jobs found, as objects.
*/
exports.getAllJobs = function(req, res){
    Job.findAll().then(jobs => {
        list = [];
        for (i = 0 ; i < jobs.length ; i++){
            list.push(jobs[i].dataValues);
        }
        res.status(200).send({
                msg: "Got ALL jobs. Every single one. Goddamn.",
                jobs: list
        });
    });
}

/**
* @api {get} /job/details/:job_id Job Details
* @apiVersion 0.2.0
* @apiName jobDetails
* @apiGroup Job
* @apiParam {Integer} job_id Wanted job's id.
* @apiSuccess {String} msg Success message.
* @apiSuccess {Object[]} Founded job as JSON object
*/
exports.jobDetails = function(req, res){
	var job_id = req.params.job_id;
	Job.findOne({
        where: { id: job_id },
        include: [
     		{ model: User, as: "Client", required: true}
  		],
    }).then(job=>{
    	if (!job){
    		res.status(400).send({
    			msg: "Invalid job_id."
    		});
    	}
    	job_detail = job.toJSON();
    	res.status(200).send({
    		msg: "Success.",
    		job: job_detail
    	});
    })
}
