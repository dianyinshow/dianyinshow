/**
 * Created by Administrator on 2017/6/15.
 */
/**
 * Created by huiyu on 2017/6/15.
 */
/**
 * Created by huiyu on 2017/6/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log(req.query.email);
    res.render('website/index/regEmail',{"mobile":req.query.mobile});
});

module.exports = router;