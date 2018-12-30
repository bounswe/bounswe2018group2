const db = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Job = db.Job;
const Job_category = db.Job_category;
const User = db.User;
const Sessions = db.Sessions;
const Profile = db.Profile;
const Job_biddings = db.Job_biddings;
const Notifs = db.Notifications;
const Freelancer_job = db.Freelancer_job;
const Job_update = db.Job_updates;
const Job_annotation = db.Job_annotations;

/**
 * @api {post} /job/create Create Job
 * @apiVersion 0.2.0
 * @apiName CreateJob
 * @apiGroup Job
 * @apiParam {Integer} client_id Mandatory
 * @apiParam {String} header Mandatory
 * @apiParam {String} description Mandatory
 * @apiParam {Datetime} [duedate] Optional
 * @apiParam {Integer} price Mandatory
 * @apiParam {Integer[]} [categories] Optional
 * @apiParam {Integer} duration Mandatory duration of the job in days
 * @apiParam {String} [bidding status] Optional if user doesn't want any bids, send it as 'closed', otherwise 'open'
 * @apiSuccess {String} msg Success message.
 */

exports.create = function(req, res) {
    const {
        header,
        description,
        duedate,
        price,
        categories,
        duration,
        bidding_status
    } = req.body;
    if (req.user.type !== "client") {
        res.status(400).send({
            msg: "User's type is not client."
        });
    } else {
        Job.create({
            // Job created
            client_id: req.user.id,
            header: header,
            description: description,
            duedate: duedate,
            price: price,
            duration: duration,
            bidding_status: bidding_status
        })
            .then(job => {
                for (i = 0; i < categories.length; i++) {
                    Job_category.create({
                        job_id: job.id,
                        category_id: categories[i]
                    });
                }
                res.status(200).send({
                    msg: "Job created",
                    id: job.id
                });
            })
            .catch(e => {
                res.status(400).send({
                    msg: "Could not create new job",
                    additionalMsg: e.message
                });
            });
    }
};

/**
 * @api {get} /job/getalljobs Get All Jobs
 * @apiVersion 0.2.0
 * @apiName GetAllJobs
 * @apiGroup Job
 * @apiSuccess {String} msg Success message.
 * @apiSuccess {Object[]} jobs List of jobs found, as objects.
 */
exports.getAllJobs = function(req, res) {
    Job.findAll({
        where: {bidding_status: "open"},
        include: [{ model: User, as: "Client", required: true }],
        order: [["updatedAt", "DESC"]]
    }).then(jobs => {
        res.status(200).send({
            msg: "Got ALL jobs. Every single one. Goddamn.",
            jobs
        });
    });
};

/**
 * @api {get} /job/getselfjobs Get Self Jobs
 * @apiVersion 0.2.0
 * @apiName GetSelfJobs
 * @apiGroup Job
 * @apiSuccess {String} msg Success message.
 * @apiSuccess {Object[]} jobs List of jobs found, as objects.
 */
exports.getSelfJobs = function(req, res) {
    if (req.user.type === "client"){
         Job.findAll({
                where: {client_id: req.user.id},
                //include: [{ model: User, as: "Client", required: true }],
                order: [["updatedAt", "DESC"]]
         }).then(jobs => {
                res.status(200).send({
                    msg: "Got all jobs for client.",
                    jobs
                });
         });
    }else{
        Freelancer_job.findAll({
            where: {user_id: req.user.id},
            include: [{ model: Job, as: "Job", required: true },{ model: User, as: "Freelancer", required: true }],
            order: [["updatedAt", "DESC"]]
        }).then(job_assocs =>{
            let jobs = [];
            for (i = 0; i < job_assocs.length; i++){
                let job_single = job_assocs[i].Job;
                jobs.unshift(job_single);
            }
            res.status(200).send({
                msg: "Got all jobs for freelancer.",
                jobs
            })
        })
    }
   
};

/**
 * @api {get} /job/getuserjobs/:userId Get User's Jobs
 * @apiVersion 0.2.0
 * @apiName GetUserJobs
 * @apiGroup Job
 * @apiSuccess {String} msg Success message.
 * @apiSuccess {Object[]} jobs List of jobs found, as objects.
 */
exports.getUserJobs = async function(req, res) {
    const user_id = req.params.userId;

    let user = await User.findOne({
        where: {id: user_id}
    })

    if (user.type === "client"){
         Job.findAll({
                where: {client_id: user.id},
                //include: [{ model: User, as: "Client", required: true }],
                order: [["updatedAt", "DESC"]]
         }).then(jobs => {
                res.status(200).send({
                    msg: "Got all jobs for client.",
                    jobs
                });
         });
    }else{
        Freelancer_job.findAll({
            where: {user_id: user.id},
            include: [{ model: Job, as: "Job", required: true },{ model: User, as: "Freelancer", required: true }],
            order: [["updatedAt", "DESC"]]
        }).then(job_assocs =>{
            let jobs = [];
            for (i = 0; i < job_assocs.length; i++){
                let job_single = job_assocs[i].Job;
                jobs.unshift(job_single);
            }
            res.status(200).send({
                msg: "Got all jobs for freelancer.",
                jobs
            })
        })
    }
   
};


/**
 * @api {get} /job/details/:job_id Job Details
 * @apiVersion 0.2.0
 * @apiName jobDetails
 * @apiGroup Job
 * @apiParam {Integer} job_id Wanted job's id.
 * @apiSuccess {String} msg Success message.
 * @apiSuccess {Object[]} job Found job as JSON object
 * @apiSuccess {Object[]} job_anno job's annotations as JSON object
 */
exports.jobDetails = async function(req, res) {
    var job_id = req.params.jobId;
    let job = await Job.findOne({
        where: { id: job_id },
        include: [{ model: User, as: "Client", required: true }]
    });
    if (!job) {
        res.status(400).send({
            msg: "Invalid job_id."
        });
        return;
    }

    let job_annotation = await Job_annotation.findAll({
        where: {job_id: job_id}
    });

    res.status(200).send({
        msg: "Success.",
        job: job,
        job_anno: job_annotation
    });
};

/**
 * @api {get} /job/details/:job_id Job Details
 * @apiVersion 0.2.0
 * @apiName jobDetails
 * @apiGroup Job
 * @apiParam {Integer} job_id Wanted job's id.
 * @apiSuccess {String} msg Success message.
 * @apiSuccess {Object[]} job Found job as JSON object
 * @apiSuccess {Object[]} job_anno job's annotations as JSON object
 */
exports.createAnnotation = async function(req, res) {
    var job_id = req.params.jobId;
    const { text, position_x, position_y } = req.body;
    let job = await Job.findOne({
        where: { id: job_id },
    });
    if (!job) {
        res.status(400).send({
            msg: "Invalid job_id."
        });
        return;
    }

    if (job.client_id != req.user.id) {
        res.status(400).send({
            msg: "The job does not belong to you."
        });
        return;
    }

    try{
        let job_annotation = await Job_annotation.create({
            job_id: job_id,
            text: text,
            position_x: position_x,
            position_y: position_y
        });
    }catch(e){
        res.status(400).send({
            msg: "Couldn't create annotation."
        });
        return;
    }


    res.status(200).send({
        msg: "Annotation successfully created.",
    });

};

/**
 * @api {post} /job/createbid Create Job Bidding
 * @apiName CreateJobBidding
 * @apiGroup Job
 * @apiParam {Integer} job_id Mandatory
 * @apiParam {Integer} amount Mandatory amount of money that freelancer bid on the jobs
 * @apiParam {String} description Optional description from freelancer
 * @apiSuccess {String} msg Success message.
 */
exports.create_bid = async function(req, res) {
    const { job_id, amount, description } = req.body;
    if (req.user.type !== "freelancer") {
        res.status(400).send({
            msg: "User's type is not freelancer."
        });
    } else {
        const job = await Job.findOne({
            where: { id: job_id }
        });
        if (!job) {
            res.status(400).send({
                msg: "Invalid job_id."
            });
            return;
        } else if (job.bidding_status !== "open") {
            res.status(400).send({
                msg: "job is not open for bidding"
            });
            return;
        }

        if (description) {
            var bidding_array = {
                job_id: job_id,
                freelancer_id: req.user.id,
                amount: amount,
                status: "waiting",
                description: description
            };
        } else {
            var bidding_array = {
                job_id: job_id,
                freelancer_id: req.user.id,
                amount: amount,
                status: "waiting"
            };
        }
        try {
            const bid = await Job_biddings.create(bidding_array);
            const fName = `${req.user.firstName} ${req.user.lastName}`;
            const jName = job.header;
            const notifresult = await createNotification(
                fName,
                jName,
                job_id,
                req.user.id,
                job.client_id,
                "bid_get"
            );

            res.status(200).send({
                msg: "Bid is successfully created",
                id: bid.id
            });
        } catch (e) {
            res.status(400).send({
                msg: "Could not create new bid",
                additionalMsg: e.message
            });
        }
    }
};

/**
 * @api {post} /job/updatebid Update Job Bidding
 * @apiName UpdateJobBidding
 * @apiGroup Job
 * @apiParam {Integer} bid_id Mandatory
 * @apiParam {Integer} new_amount Mandatory amount of money that freelancer bid on the job
 * @apiParam {String} new_description Optional new description of the bid
 * @apiSuccess {String} msg Success message.
 */
exports.update_bid = async function(req, res) {
    const { bid_id, new_amount, new_description } = req.body;
    const hasBidding = await Job_biddings.findOne({
        where: { id: bid_id }
    });
    if (!hasBidding) {
        res.status(400).send({
            msg: "Invalid bid_id."
        });
        return;
    }

    const job = await Job.findOne({
        where: { id: hasBidding.job_id }
    });

    if (job.bidding_status !== "open") {
        res.status(400).send({
            msg: "Job is not opened for bidding."
        });
        return;
    }
    const freelancer = await User.findOne({
        where: { id: hasBidding.freelancer_id }
    });

    if (freelancer.id != req.user.id) {
        res.status(400).send({
            msg: "The bid is not from the logged in user."
        });
        return;
    }
    hasBidding
        .updateAttributes({
            amount: new_amount,
            description: new_description
        })
        .then(bid => {
            res.status(200).send({
                msg: "Bid is successfully updated",
                id: bid.id
            });
        })
        .catch(e => {
            res.status(400).send({
                msg: "Could not update the bid",
                additionalMsg: e.message
            });
        });
};
/**
 * @api {post} /job/cancelbid Cancel Job Bidding
 * @apiName CancelJobBidding
 * @apiGroup Job
 * @apiParam {Integer} bid_id Mandatory
 * @apiSuccess {String} msg Success message.
 */
exports.cancel_bid = async function(req, res) {
    const { bid_id } = req.body;
    const bid = await Job_biddings.findOne({
        where: { id: bid_id }
    });
    if (!bid) {
        res.status(400).send({
            msg: "Invalid bid_id."
        });
        return;
    }

    const freelancer = await User.findOne({
        where: { id: bid.freelancer_id }
    });

    if (freelancer.id != req.user.id) {
        res.status(400).send({
            msg: "The bid is not from the logged in user."
        });
        return;
    }
    bid.destroy()
        .then(
            res.status(200).send({
                msg: "Bid is successfully deleted",
                id: bid.id
            })
        )
        .catch(e => {
            res.status(400).send({
                msg: "Could not delete the bid",
                additionalMsg: e.message
            });
        });
};

/**
 * @api {post} /job/acceptbid Accept Job Bidding
 * @apiName AcceptJobBidding
 * @apiGroup Job
 * @apiParam {Integer} bid_id Mandatory
 * @apiSuccess {String} msg Success message.
 */
exports.accept_bid = async function(req, res) {
    const { bid_id } = req.body;

    const bid = await Job_biddings.findOne({
        where: { id: bid_id }
    });
    if (!bid) {
        res.status(400).send({
            msg: "Invalid bid_id."
        });
        return;
    }

    const job = await Job.findOne({
        where: { id: bid.job_id }
    });

    if (job.client_id !== req.user.id) {
        res.status(400).send({
            msg: "The job is not from the logged in user."
        });
        return;
    }

    job.updateAttributes({
        bidding_status: "closed"
    }).catch(e => {
        res.status(400).send({
            msg: "Could not update the job",
            additionalMsg: e.message
        });
        return;
    });

    //TO DO : ADD START AND END DATES
    try {
        const free_job = await Freelancer_job.create({
            user_id: bid.freelancer_id,
            job_id: bid.job_id
        });
    } catch (e) {
        res.status(400).send({
            msg: "Could not create a freelancer/job association",
            additionalMsg: e.message
        });
    }

    try {
        const bidres = await bid.updateAttributes({ status: "accepted" });
        const fName = `${req.user.firstName} ${req.user.lastName}`;
        const jName = job.header;
        const notifresult = await createNotification(
            fName,
            jName,
            bid.job_id,
            req.user.id,
            bid.freelancer_id,
            "bid_accept"
        );

        res.status(200).send({
            msg: "Bid is successfully accepted",
            id: bid.id
        });
    } catch (e) {
        res.status(400).send({
            msg: "Could not accept the bid",
            additionalMsg: e.message
        });
    }
};

/**
 * @api {post} /job/rejectbid Reject Job Bidding
 * @apiName RejectJobBidding
 * @apiGroup Job
 * @apiParam {Integer} bid_id Mandatory
 * @apiSuccess {String} msg Success message.
 */
exports.reject_bid = async function(req, res) {
    const { bid_id } = req.body;

    const bid = await Job_biddings.findOne({
        where: { id: bid_id }
    });
    if (!bid) {
        res.status(400).send({
            msg: "Invalid bid_id."
        });
        return;
    }
    const job = await Job.findOne({
        where: { id: bid.job_id }
    });

    if (job.client_id !== req.user.id) {
        res.status(400).send({
            msg: "The job is not from the logged in user."
        });
        return;
    }
    try {
        const bidres = await bid.updateAttributes({ status: "rejected" });
        const fName = `${req.user.firstName} ${req.user.lastName}`;
        const jName = job.header;
        const notifresult = await createNotification(
            fName,
            jName,
            bid.job_id,
            req.user.id,
            bid.freelancer_id,
            "bid_reject"
        );

        res.status(200).send({
            msg: "Bid is successfully rejected",
            id: bid.id
        });
    } catch (e) {
        res.status(400).send({
            msg: "Could not reject the bid",
            additionalMsg: e.message
        });
    }
};

async function createNotification(uName, jName, job_id, send_id, rec_id, type) {
    //uName represents the freelancer in bid_get and deliver_update, and the client in the other three. Keep that in mind.
    //why the fuck did I think this was a good idea?

    var description = "";
    if (type === "bid_get") {
        description = `New bid received for ${jName} by ${uName}!`;
    } else if (type == "bid_accept") {
        description = `${uName} has accepted your bid on ${jName}!`;
    } else if (type === "bid_reject") {
        description = `${uName} has rejected your bid on ${jName}.`;
    } else if (type === "request_update") {
        description = `${uName} has requested an update on ${jName}.`;
    } else if (type === "deliver_update") {
        description = `${uName} has delivered an update on ${jName}.`;
    } else {
        description =
            "This message should not appear. Feel free to send the admins a warning if it does!";
    }

    const res = await Notifs.create({
        sender_id: send_id,
        receiver_id: rec_id,
        job_id: job_id,
        description: description,
        message_type: type,
        isRead: false
    });

    return res;
}

exports.getAllBids = async function(req, res) {
    const job_id = req.params.jobId;
    const job = await Job.findOne({
        where: { id: job_id }
    });
    if (!job) {
        res.status(400).send({
            msg: "Invalid job_id."
        });
        return;
    }

    Job_biddings.findAll({
        where: { job_id: job_id },
        include: [{ model: User, as: "Freelancer", required: true }]
    }).then(bids => {
        res.status(200).send({
            msg: "Got all bids and their creators for given job.",
            bids
        });
    });
};

exports.deleteJob = async function(req, res) {
    const user_id = req.user.id;
    const { job_id } = req.body;
    const job = await Job.findOne({
        where: { id: job_id }
    });

    if (!job) {
        res.status(400).send({
            msg: "Invalid job_id."
        });
        return;
    }

    const client = await User.findOne({
        where: { id: user_id }
    });

    if (client.id != job.client_id) {
        res.status(400).send({
            msg: "You do not have permission to delete this job."
        });
        return;
    }
    job.destroy()
        .then(
            res.status(200).send({
                msg: "Job is successfully deleted",
                id: job.id
            })
        )
        .catch(e => {
            res.status(400).send({
                msg: "Could not delete the job",
                additionalMsg: e.message
            });
        });
};

/**
 * @api {post} /job/requestupdate  Request Update -> If client wants an update on the job, use this request
 * @apiName RequestUpdate
 * @apiGroup Job
 * @apiParam {Integer} job_id Mandatory
 * @apiSuccess {String} msg Success message.
 */
exports.request_update = async function(req, res) {
    const { job_id } = req.body;
    if (req.user.type !== "client") {
        res.status(400).send({
            msg: "User's type is not client."
        });
    } else {
        const user_id = req.user.id;
        const job = await Job.findOne({
            where: { id: job_id }
        });
        if (job.client_id !== user_id) {
            res.status(400).send({
                msg: "This job is not created by this client"
            });
        }
        const job_update_array = {
            job_id: job_id,
            user_id: user_id,
            type: "request"
        };
        try {
            const job_update = await Job_update.create(job_update_array);

            const freejob = await Freelancer_job.findOne({
                where: {
                    job_id: job_id,
                }
            });

            let freelancer_id = freejob.user_id;
            const fName = `${req.user.firstName} ${req.user.lastName}`;
            const jName = job.header;

            const notifresult = await createNotification(
            fName,
            jName,
            job_id,
            req.user.id,
            freelancer_id,
            "request_update"
            );

            //TODO Testing
            res.status(200).send({
                msg: "Request is successfully created",
                id: job_update.id
            });
        } catch (e) {
            res.status(400).send({
                msg: "Could not create new request",
                additionalMsg: e.message
            });
        }
    }
};

/**
 * @api {post} /job/createupdate  Create Update -> If freelancer wants to create a milestone or completion,
 * @apiName CreateUpdate
 * @apiGroup Job
 * @apiParam {Integer} job_id Mandatory
 * @apiParam {String} type "milestone" or "completion"
 * @apiSuccess {String} msg Success message.
 */
exports.create_update = async function(req, res) {
    const { job_id, type } = req.body;
    if (req.user.type !== "freelancer") {
        res.status(400).send({
            msg: "User's type is not freelancer."
        });
    } else {
        const user_id = req.user.id;
        const freelancer_job = await Freelancer_job.findOne({
            where: { job_id: job_id, user_id: user_id }
        });
        const job = await Job.findOne({
            where: {id: job_id}
        });


        if (freelancer_job.user_id !== user_id) {
            res.status(400).send({
                msg: "This job is not assigned to this freelancer."
            });
        }
        const job_update_array = {
            job_id: job_id,
            user_id: user_id,
            type: type
        };
        try {
            const job_update = await Job_update.create(job_update_array);

            let client_id = job.client_id;
            const fName = `${req.user.firstName} ${req.user.lastName}`;
            const jName = job.header;

            const notifresult = await createNotification(
            fName,
            jName,
            job_id,
            user_id,
            client_id,
            "deliver_update"
            );
            //TODO Testing
            res.status(200).send({
                msg: type + " is successfully created",
                id: job_update.id
            });
        } catch (e) {
            res.status(400).send({
                msg: "Could not create the update",
                additionalMsg: e.message
            });
        }
    }
};
