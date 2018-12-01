const express = require("express");
const router = express.Router();
const user = require("../controllers/user_controller.js");
const job = require("../controllers/job_controller.js");
const notif = require("../controllers/notification_controller.js");
const { auth } = require("../middleware");
const path = require("path");
/* GET home page. */
router.get("/", function(req, res, next) {
    res.json({ title: "hoppa" });
});
//apidoc
router.get("/apidoc", express.static(path.join(__dirname, "apidoc")));

router.post("/user/create", user.create);
router.post("/user/login", user.login);
router.post("/user/logout", auth, user.logout);
router.post("/user/updateprofile", auth, user.updateProfile);

router.get("/member", auth, user.profileInfo);
router.get("/member/:userId", auth, user.profileInfo);

router.post("/job/create", auth, job.create);
router.get("/job/getalljobs", job.getAllJobs);

router.get("/job/getfreelancers", user.getAllFreelancers);
router.get("/job/details/:job_id", job.jobDetails)
router.post("/job/createbid", auth, job.create_bid);
router.post("/job/updatebid", auth, job.update_bid);
router.post("/job/cancelbid", auth, job.cancel_bid);


router.post("/message/sendnotification", auth, notif.create);

module.exports = router;
