const process = require("child_process");
const util = require("./util");

util.getBranchPrefix.then(prefix => {
    if (prefix === util.FRONTEND_PREFIX) {
        process.exec(`cd frontend && npm run start`);
    } else if (prefix === util.BACKEND_PREFIX) {
        process.exec(`cd backend && npm run start`);
    }
});