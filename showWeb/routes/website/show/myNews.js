/**
 * Created by wanhua on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
var Message = require('../../../model/message');
router.get('/', function (req, res){
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    Message.findAllMess(req, res, function (err, messages){
        if(err) {
            console.log(err);
        }else {
            var value = [];
            messages.forEach(function (val){
                if(val.status == 1) {
                    value.push(val);
                }
            });
            var results = messages.slice(index, index + pageSize);
            if(messages.length) {
                res.render('website/show/myNews', {
                    user: req.session.user[0],
                    value: value,
                    messages: results,
                    currentPage: pageNum,
                    totalPage: Math.ceil(messages.length / pageSize)
                });
            }else {
                res.render('website/show/myNews', {
                    user: req.session.user[0],
                    value: []
                });
            }
        }
    });
});
module.exports = router;