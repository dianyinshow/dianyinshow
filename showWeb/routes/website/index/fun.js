/**
 * Created by huiyu on 2017/6/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log("1111");
    res.render('website/index/fun');
});

module.exports = router;