const db = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const Job = db.Job;
const Job_category = db.Job_category;
const User = db.User;
const Sessions = db.Sessions;
const Profile = db.Profile;
const Job_biddings = db.Job_biddings;

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
    const {
        header,
        description,
        due_date,
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
            duedate: due_date,
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
        include: [{ model: User, as: "Client", required: true }]
    }).then(jobs => {
        res.status(200).send({
            msg: "Got ALL jobs. Every single one. Goddamn.",
            jobs
        });
    });
};

/**
 * @api {get} /job/details/:job_id Job Details
 * @apiVersion 0.2.0
 * @apiName jobDetails
 * @apiGroup Job
 * @apiParam {Integer} job_id Wanted job's id.
 * @apiSuccess {String} msg Success message.
 * @apiSuccess {Object[]} Founded job as JSON object
 */
exports.jobDetails = function(req, res) {
    var job_id = req.params.job_id;
    Job.findOne({
        where: { id: job_id },
        include: [{ model: User, as: "Client", required: true }]
    }).then(job => {
        if (!job) {
            res.status(400).send({
                msg: "Invalid job_id."
            });
            return;
        }
        job_detail = job.toJSON();
        res.status(200).send({
            msg: "Success.",
            job: job_detail
        });
    });
};

/**
 * @api {post} /job/createbid Create Job Bidding
 * @apiName CreateJobBidding
 * @apiGroup Job
 * @apiParam {Integer} job_id Mandatory
 * @apiParam {Integer} amount Mandatory amount of money that freelancer bid on the job
 * @apiSuccess {String} msg Success message.
 */
exports.create_bid = function(req, res) {
    const { job_id, amount, description } = req.body;
    if (req.user.type !== "freelancer") {
        res.status(400).send({
            msg: "User's type is not freelancer."
        });
    } else {
        Job.findOne({
            where: { id: job_id }
        }).then(job => {
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
            Job_biddings.create({
                // Job bidding created
                job_id: job_id,
                freelancer_id: req.user.id,
                amount: amount,
                description: description,
                status: "waiting"
            })
                .then(bid => {
                    res.status(200).send({
                        msg: "Bid is successfully created",
                        id: bid.id
                    });
                })
                .catch(e => {
                    res.status(400).send({
                        msg: "Could not create new bid",
                        additionalMsg: e.message
                    });
                });
        });
    }
};

/**
 * @api {post} /job/updatebid Update Job Bidding
 * @apiName UpdateJobBidding
 * @apiGroup Job
 * @apiParam {Integer} bid_id Mandatory
 * @apiParam {Integer} new_amount Mandatory amount of money that freelancer bid on the job
 * @apiSuccess {String} msg Success message.
 */
exports.update_bid = async function(req, res) {
    const { bid_id, new_amount, description} = req.body;
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
            description: description
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

exports.getAllBids = async function(req, res) {
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
    
    Job_biddings.findAll({
        where: {job_id: job_id},
        include: [{ model: User, as: "Freelancer", required: true }]
    }).then(bids => {
        res.status(200).send({
            msg: "Got all bids and their creators for given job.",
            bids
        });
    });
};

exports.deleteJob = async function(req,res){
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


