const AWS = require("aws-sdk");
const config = require("../config/config");

AWS.config.update({
    accessKeyId: config.awsKeyId,
    secretAccessKey: config.awsSecretKey
});

module.exports = new AWS.S3();