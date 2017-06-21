/**
 * Created by huiyu on 2017/6/15.
 */
/**
 * Created by huiyu on 2017/6/15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('website/index/reg',{
        title:'首页的标题'
    });
});

module.exports = router;