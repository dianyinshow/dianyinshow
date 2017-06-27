/**
 * Created by huiyu on 2017/6/15.
 */
var express = require('express');
var router = express.Router();
/* 我的秀 */
router.get('/', function (req, res){

    res.render('webIndex/show/index',{
        "user":req.session.user
    });
});

module.exports = router;