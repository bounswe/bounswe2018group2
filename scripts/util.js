const process = require("child_process");
const FRONTEND_PREFIX = "frontend";
const BACKEND_PREFIX = "backend";
const ANDROID_PREFIX = "android";

const getBranchPrefix = new Promise((resolve, reject) => {
    process.exec(`git branch | grep \\* | cut -d ' ' -f2 | cut -d '/' -f1`, (err, stdout, stderr) => {
        if (err) {
            reject(err);
            return;
        }

        if (stderr) {
            reject(stderr.trim());
            return;
        }

        resolve(stdout.trim());
    });
});

module.exports = {
    getBranchPrefix,
    FRONTEND_PREFIX,
    BACKEND_PREFIX,
    ANDROID_PREFIX
};