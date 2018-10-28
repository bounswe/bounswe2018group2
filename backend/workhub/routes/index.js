var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'hoppa' });
});

var user = require('../controllers/user_controller.js');
router.post('/user/create', user.create);
router.post('/user/login', user.login);

router.get('/member/:userId', user.profileInfo);

module.exports = router;
