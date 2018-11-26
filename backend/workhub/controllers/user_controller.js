const db = require("../models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = db.User;
const Sessions = db.Sessions;
const Profile = db.Profile;

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
                        description: "I'm currently descriptionless. Get creative!",
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
    }).then(() => {
        res.send({
            msg: "success" // we should delete these messages
        });
    }).catch(() => {
        res.status(400).send({
            msg: "Cannot destroy session"
        });
    });
}

exports.profileInfo = function(req, res) {
    var user_id = req.params.userId;
    let getProfilePromise = Profile.findOne({
        where: { user_id: user_id }
    });

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
