/**
 * Created by huiyu on 2017/6/15.
 */
var express = require('express');
var router = express.Router();
/* 我的秀 */
router.get('/', function (req, res){

    console.log(req.session.user);
    console.log(req.query.id);
    res.render('webIndex/show/index',{"user":req.session.user});
    //res.render('webIndex/show/myshow',{"user":req.session.user});

});

module.exports = router;