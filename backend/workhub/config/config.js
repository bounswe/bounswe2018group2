const path = require("path");
const env = process.env.NODE_ENV || "local"
const resolvedPath = path.resolve(__dirname, "..", `.env.${env}`);

require("dotenv").config({
  path: resolvedPath
});

console.log("process.env.MYSQL_HOST", process.env.MYSQL_HOST);

module.exports = {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    awsKeyId: process.env.AWS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_KEY,
    dialect: "mysql"
};
