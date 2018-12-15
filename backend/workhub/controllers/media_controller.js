const s3 = require("../utils/s3");
const config = require("../config/config");
const httpStatusCodes = require("http-status-codes");

exports.uploadFile = function (req, res) {
    const { key, file } = req.body;
    if (!file) {
        res.status(httpStatusCodes.BAD_REQUEST).send({
            msg: "Need a file in body"
        });
        return;
    }

    s3.putObject({
        Body: new Buffer(file.replace(/^data:image\/\w+;base64,/, ""), "base64"),
        Bucket: config.bucketName,
        Key: key
    }, (err, data) => {
        if (err) {
            res.status(httpStatusCodes.BAD_REQUEST).send({
                msg: err.message
            });
            return;
        }

        res.send({
            msg: "Uploaded successfully",
            url: `${config.bucketURL}/${key}`,
            data
        });
    });
}