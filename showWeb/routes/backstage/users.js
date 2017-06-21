/**
 * Created by wanhua on 2017/6/8.
 */
var express = require('express');
var router = express.Router();
var Users = require('../../model/backstage-user');

router.get('/', function (req, res) {
   /* var pageSize = 10;
    var pageNum = req.query.pageNum;
    var offset = (pageNum - 1) * pageSize;

    Users.find({})
        .sort({createAt: -1})
        .exec(function (err, users) {
            if (err) {
                console.log(err);
            } else {
                var results = users.slice(offset, offset + pageSize);
                res.render('backstage/layout/users', {
                    title: '用户管理列表',
                    users: results,
                    currentPage: pageNum,
                    totalPage: Math.ceil(users.length / pageSize)
                });
            }
        });*/
    var pageSize = 10;
    var pageNum = req.query.pageNum;
    var offset = (pageNum - 1) * pageSize;
   Users.findAll(req, res, function (err, results){
        if(err) {
            console.log(err);
        }else {
            var result = results.slice(offset, offset + pageSize);
            res.render('backstage/layout/users', {
                title: '用户管理列表',
                users: result,
                currentPage: pageNum,
                totalPage: Math.ceil(results.length / pageSize)
            });
        }
   })
});

module.exports = router;