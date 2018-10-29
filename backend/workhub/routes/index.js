const express = require("express");
const router = express.Router();
const user = require("../controllers/user_controller.js");
const { auth } = require("../middleware");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.json({ title: "hoppa" });
});

router.post("/user/create", user.create);
router.post("/user/login", user.login);

router.get("/member", auth, user.profileInfo);
router.get("/member/:userId", auth, user.profileInfo);

module.exports = router;
