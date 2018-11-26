const db = require("../models");

const User = db.User;
const Sessions = db.Sessions;
const Profile = db.Profile;
const Job = db.Job;
const Notifications = db.Notifications;
const Freelancer_job = db.Freelancer_job;


/**
* @api {get} /message/sendnotification/ Send Notification to Other User
* @apiVersion 0.2.0
* @apiName sendNotification
* @apiGroup Notification
* @apiParam {Integer} job_id The id of the job that the notification is about.
* @apiParam {String} description Message to send. Only used if the message type is "custom".
* @apiParam {Enum} message_type The type of the message. Can currently be either "status" or "custom".
* @apiSuccess {String} msg Success message.
*/
exports.create = async function(req, res) {
	const {job_id, description, message_type} = req.body;

	const sender_id = req.user.id;
	const sender_name = req.user.firstName + " " + req.user.lastName;

	const isClient = (req.user.type === 'client');

	var receiver_id = -1;
	var receiver_name = "";
	var header = "";
	var sentDescription = "";

	if (job_id){
		if (isClient){
			const hasjob = await Job.findOne(
				{
					where: {id: job_id, client_id: sender_id}
				}
			)

			if (!hasjob){
				await res.status(400).send({
    				msg: "That isn't your job."
    			});
    			return;
			}



			const found = await Freelancer_job.findOne(
				{
				where: {job_id : job_id},
					include: [
						{model: Job, as: "Job"}
					]
				}
			);
			if (!found){
				await res.status(400).send({
    				msg: "Nobody is working on that job."
    			});
    			return;
			}else{
				receiver_id = found.user_id;
				header = found['Job'].header;
			}
		}else{
			const hasjob = await Freelancer_job.findOne(
				{
					where: {job_id: job_id, user_id: sender_id}
				}
			)

			if (!hasjob){
				await res.status(400).send({
    				msg: "That isn't your job."
    			});
    			return;
			}


			const found = await Job.findOne(
				{
					where: {id : job_id}
				}
			);

			if (!found){
				res.status(400).send({
    				msg: "Nobody has given out that job... wait, what?"
    			});
    			return;
			}else{
				receiver_id = found.client_id;
				header = found.header;
			}
		}
	}

	await User.findOne(
		{
			where: {id : receiver_id}
		}
	).then(recuser => {
		if (!recuser){
			console.log(receiver_id);
			res.status(400).send({
	    		msg: "User not found."
	    	});
	    	return;
		}else{
			receiver_name = recuser.firstName + " " + recuser.lastName;
		}
	})

	//This is the most "placeholder" message ever. Just.....just replace it with something descriptive later, please.
	//UH OH, YOU FRICCIN MORON! YOU JUST GOT ES6'D! TAG YOUR FRIENDS TO TOTALLY ES6 THEM! 
	if (message_type === 'status'){
		if (isClient){
			sentDescription = `Hey, ${receiver_name}, ${sender_name} wants a status report on ${header}!`;
		}else{
			sentDescription = `Hey, ${receiver_name}, ${sender_name} wants clarification on ${header}!`;
		}	
	}else{
		sentDescription = description;
	}

	await Notifications.create({
		sender_id: sender_id,
		receiver_id: receiver_id,
		job_id: job_id,
		description: sentDescription,
		message_type: message_type,
		isRead: false
	});

	await res.status(200).send({
		msg: "Notification created"
	});

}
