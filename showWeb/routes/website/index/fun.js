/**
 * Created by huiyu on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var users = req.session.user;
    res.render('website/index/fun', {users: users});
});

module.exports = router;