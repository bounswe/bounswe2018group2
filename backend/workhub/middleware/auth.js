const { Sessions, User } = require("../models");
const HttpStatus = require("http-status-codes");

const getSession = async token => {
    if (!token) {
        return null;
    }

    console.log("token", token);
    return await Sessions.findOne({
        where: {
            user_token: token
        }
    });
};

/*
* Requires "userToken" header to be a valid token.
*/
module.exports = async (req, res, next) => {
    const session = await getSession(req.headers.usertoken);
    if (!session) {
        return res.status(HttpStatus.FORBIDDEN).send({
            msg: "Not a valid token"
        });
    }

    const user = await User.findOne({
        where: {
            id: session.user_id
        }
    });

    req.user = user;
    next();
};
