/**
 * Created by huiyu on 2017/6/15.
 */
var express = require('express');
var router = express.Router();
var Message = require('../../../model/message');
/* 我的秀 */
router.get('/', function (req, res){
    Message.findAll(req, res, function (err, result){
        if(err) {
            console.log(err);
        }else {
            req.session.value = result;
            if(result.length) {
                res.render('website/show/index',{
                    "user":req.session.user[0],
                    result: result
                });
            }else {
                console.log('查找结果不存在');
                res.render('website/show/index', {
                    user: req.session.user[0],
                    result: []
                });
            }
        }
    });

});

module.exports = router;