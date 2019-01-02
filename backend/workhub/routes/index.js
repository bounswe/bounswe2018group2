const express = require("express");
const router = express.Router();
const user = require("../controllers/user_controller.js");
const job = require("../controllers/job_controller.js");
const notif = require("../controllers/notification_controller.js");
const media = require("../controllers/media_controller");
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
router.get("/job/getselfjobs", auth, job.getSelfJobs);
router.get("/job/getuserjobs/:userId", job.getUserJobs);
router.get("/user/getcategories", user.getAllCategories);
router.post("/user/addinterests", auth, user.addInterests);
router.post("/user/removeinterests", auth, user.removeInterests);

router.get("/job/getfreelancers", user.getAllFreelancers);
router.get("/job/details/:jobId", job.jobDetails);
router.post("/job/delete", auth, job.deleteJob);
router.post("/job/createbid", auth, job.create_bid);
router.post("/job/updatebid", auth, job.update_bid);
router.post("/job/cancelbid", auth, job.cancel_bid);

router.post("/job/acceptbid", auth, job.accept_bid);
router.post("/job/rejectbid", auth, job.reject_bid);
router.get("/job/getallbids/:jobId", auth, job.getAllBids);
router.post("/job/requestupdate", auth, job.request_update);
router.post("/job/createupdate", auth, job.create_update);
router.post("/message/sendnotification", auth, notif.create);
router.post("/media/upload", auth, media.uploadFile);

router.post("/job/createannotation/:jobId", auth, job.createAnnotation);

module.exports = router;
