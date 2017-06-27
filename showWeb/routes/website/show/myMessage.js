/**
 * Created by wanhua on 2017/6/26.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var Message = require('../../../model/message');
router.get('/', function (req, res){
    //查找到所有未读的消息
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    Message.findAll(req, res, function (err, messages) {
        if (err) {
            console.log(err);
        } else {
            var results = messages.slice(index, index + pageSize);
            res.render('website/show/message', {
                value: messages,
                messages: results,
                currentPage: pageNum,
                totalPage: Math.ceil(messages.length / pageSize)
            });
        }
    });
});
router.get('/dialog', function (req, res){
    var value = req.query;
    var messId = value.id;
    Message.findAllMess(req, res, function (err, messages){
        var value = [];
        var all = [];
        if (err) {
            console.log(err);
        } else {
            messages.forEach(function (val){
                if(val.status == 0) {
                    // 已读的消息列表
                    value.push(val);
                }else {
                    // 未读的消息列表
                    all.push(val);
                }
            });
            Message.findOne(req, res, function (err, result){
                if(err) {
                    console.log(err);
                }else {
                    if(result.length) {

                        if(value.indexOf(result[0]) == -1) {
                            value.push(result[0]);
                        }

                        Message.update(req, res, function (err, val){
                            res.render('website/show/dialog-myNews', {
                                value: all,
                                messages: value,
                                user: req.session.user[0]
                            });
                        }, messId);
                    }
                }
            }, messId);

        }
    });
});
module.exports = router;