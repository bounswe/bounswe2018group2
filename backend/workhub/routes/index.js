const express = require("express");
const router = express.Router();
const user = require("../controllers/user_controller.js");
const job = require("../controllers/job_controller.js");
const { auth } = require("../middleware");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.json({ title: "hoppa" });
});

router.post("/user/create", user.create);
router.post("/user/login", user.login);

router.post("/user/logout", auth, user.logout);
router.get("/member", auth, user.profileInfo);
router.get("/member/:userId", auth, user.profileInfo);

router.post("/job/create", job.create);
router.get("/job/getalljobs", job.getAllJobs);
router.get("/job/details/:job_id", job.jobDetails)

module.exports = router;
