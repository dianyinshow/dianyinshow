/**
 * Created by huiyu on 2017/6/15
 * */
var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    //req.session.user = {username:'username'};
    var user = req.session.user;
    console.log(user);
    console.log(req.session.user);
    //console.log(req.session);
    res.render('website/index',{title:'首页的标题','user':user});
});

/*router.get('/website/fun', function (req, res, next) {
 console.log("111");
 res.render('website/index/fun',{
 title:'首页的标题'
 });
 });*/

router.get('/index/comshow', function (req, res, next) {
    res.render('website/index/comshow',{
        title:'首页的标题'
    });
});

router.get('/index/comshow/conlist', function (req, res, next) {
    res.render('website/index/conlist',{
        title:'首页的标题'
    });
});

module.exports = router;