const db = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = db.User;
const Sessions = db.Sessions;
const Profile = db.Profile;
const Category = db.Category;
const Freelancer_category = db.Freelancer_category;

const saltRounds = 10;

exports.create = function(req, res) {
    const { email, firstName, lastName, password, type } = req.body;

    //see if that email already exists.
    User.findOne({
        where: { email: email }
    }).then(users => {
        console.log("searched the database");
        if (users) {
            res.status(500).send({
                msg: "This e-mail has already been registered."
            });
        } else {
            console.log("no email clashes with existing data");

            var salt = bcrypt.genSaltSync(saltRounds);
            var hashedpass = bcrypt.hashSync(password, salt);

            User.create({
                //don't even think about shortening this, it caused so much stupid shit that I need to make it 200% clear
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedpass,
                type: type
            })
                .then(user => {
                    Profile.create({
                        user_id: user.id,
                        description:
                            "I'm currently descriptionless. Get creative!",
                        rating: 0.0
                    }).then(() => {
                        res.send({
                            msg: "User successfully created."
                        });
                    });
                })
                .catch(e => {
                    console.log(e);
                    res.status(400).send({
                        msg: "Something bad happened."
                    });
                });
        }
    });
};

exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({
        where: { email: email }
    }).then(users => {
        if (users) {
            bcrypt.compare(req.body.password, users.password, function(
                err,
                result
            ) {
                if (result) {
                    var token = crypto.randomBytes(48).toString("hex");

                    Sessions.findOne({
                        //check if a user session already exists
                        where: {
                            user_id: users.id
                        }
                    }).then(sess => {
                        //if so, update it
                        if (sess) {
                            sess.updateAttributes({
                                user_token: token
                            });
                            //otherwise, create it
                        } else {
                            Sessions.create({
                                user_id: users.id,
                                user_token: token
                            });
                        }
                    });

                    res.status(200).send({
                        msg: "Logged in successfully.",
                        token: token
                    });
                } else {
                    res.status(500).send({
                        msg: "E-mail and password does not match."
                    });
                }
            });
        } else {
            res.status(400).send({
                msg: "This e-mail does not exist."
            });
        }
    });
};

exports.logout = function(req, res) {
    Sessions.destroy({
        where: {
            user_id: req.user.id
        }
    })
        .then(() => {
            res.send({
                msg: "success" // we should delete these messages
            });
        })
        .catch(() => {
            res.status(400).send({
                msg: "Cannot destroy session"
            });
        });
};

exports.profileInfo = function(req, res) {
    var user_id = req.params.userId;
    let getProfilePromise = Profile.findOne({
        where: { user_id: user_id }
    });
    if (req.user.type === "freelancer") {
        let freelancerCategories = Freelancer_category.findAll({
            where: { freelancer_id: req.user.id },
            attributes: ["category_id"]
        });
        if (!user_id) {
            getProfilePromise = User.findOne({
                where: { id: req.user.id }
            });
        }

        getProfilePromise.then(profile => {
            if (profile) {
                res.status(200).send({
                    id: req.user.id,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    email: req.user.email,
                    type: req.user.type,
                    description: profile.description,
                    rating: profile.rating,
                    categories: freelancerCategories,
                    msg: "User found successfully."
                });
            } else {
                res.status(400).send({
                    msg: "User not found."
                });
            }
        });
    }
    if (!user_id) {
        getProfilePromise = req.user.getProfile();
    }

    getProfilePromise.then(profile => {
        if (profile) {
            res.status(200).send({
                id: req.user.id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                type: req.user.type,
                description: profile.description,
                rating: profile.rating,
                msg: "User found successfully."
            });
        } else {
            res.status(400).send({
                msg: "User not found."
            });
        }
    });
};

exports.updateProfile = async function(req, res) {
    const { firstName, lastName, description, type } = req.body;
    var user_id = req.user.id;

    let getProfilePromise = await Profile.findOne({
        where: { user_id: user_id }
    });

    if (!getProfilePromise) {
        res.status(400).send({
            msg: "User not found. That's... really not right."
        });
    } else {
        let result_profile = await getProfilePromise.updateAttributes({
            description: description,
            type: type
        });

        let result_user = await req.user.updateAttributes({
            firstName: firstName,
            lastName: lastName
        });

        if (result_user && result_profile) {
            res.status(200).send({
                msg: "Profile updated successfully."
            });
        } else {
            res.status(400).send({
                msg:
                    "Something could not be updated. Have fun figuring out what it was!"
            });
        }
    }
};
/**
 * @api {post} /user/addinterests  adds categories to freelancer
 * @apiName addInterests
 * @apiGroup User
 * @apiParam {categories} array of integer category_ids.
 * @apiSuccess {String} msg Success message.
 */
exports.addInterests = async function(req, res) {
    const { categories } = req.body;
    var user_id = req.user.id;
    let user = await User.findOne({
        where: { id: user_id }
    });
    if (!user) {
        res.status(400).send({
            msg: "User not found!"
        });
    } else {
        for (let i = 0; i < categories.length; i++) {
            Freelancer_category.create({
                freelancer_id: user_id,
                category_id: categories[i]
            });
        }
        res.status(200).send({
            msg: "Categories are added successfully"
        });
    }
};

/**
 * @api {post} /user/removeinterests  removes categories from freelancer
 * @apiName removeInterests
 * @apiGroup User
 * @apiParam {categories} array of integer category_ids.
 * @apiSuccess {String} msg Success message.
 */
exports.removeInterests = async function(req, res) {
    const { categories } = req.body;
    var user_id = req.user.id;
    let user = await User.findOne({
        where: { id: user_id }
    });
    if (!user) {
        res.status(400).send({
            msg: "User not found!"
        });
    } else {
        for (let i = 0; i < categories.length; i++) {
            Freelancer_category.destroy({
                where: {
                    freelancer_id: user_id,
                    category_id: categories[i]
                }
            });
        }
        res.status(200).send({
            msg: "Categories are deleted successfully"
        });
    }
};

exports.getAllFreelancers = async function(req, res) {
    var freelancers = await User.findAll({
        where: { type: "freelancer" }
    });

    console.log(freelancers);

    if (freelancers) {
        res.status(200).send({
            msg: "Got all freelancers.",
            freelancers
        });
    } else {
        res.status(400).send({
            msg: "User not found."
        });
    }
};

/**
 * @api {get} /user/getcategories  returns all categories
 * @apiName getAllCategories
 * @apiGroup User
 * @apiSuccess {String} msg Success message.
 */
exports.getAllCategories = async function(req, res) {
    let categories = await Category.findAll();
    console.log("adjkahkdjkhakd");
    if (categories) {
        res.status(200).send({
            msg: "Got all categories.",
            categories
        });
    } else {
        res.status(400).send({
            msg: "Categories not found."
        });
    }
};
