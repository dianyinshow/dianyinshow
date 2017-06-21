/**
 * Created by Administrator on 2017/5/30.
 */
var express = require('express');
var router = express.Router();
/* 首页 */
router.get('/', function (req, res){
    res.render('backstage/layout/first', {
        title: '万华'
    });
});

module.exports = router;