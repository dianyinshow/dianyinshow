/**
 * Created by huiyu on 2017/6/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('website/index/login');
});

router.get('/resetPassword', function (req, res, next) {
    res.render('website/index/resetPassword');
});

module.exports = router;