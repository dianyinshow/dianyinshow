/**
 * Created by wanhua on 2017/6/8.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/photo/show'});
var Users = require('../../model/backstage-user');
var My_bank = require('../../model/my_bank');
var My_account = require('../../model/my_account');
var Message = require('../../model/message');

router.get('/', function (req, res) {
    var pageSize = 10;
    var pageNum = req.query.pageNum;
    var offset = (pageNum - 1) * pageSize;
    Users.findAll(req, res, function (err, results) {
        if (err) {
            console.log(err);
        } else {
            var result = results.slice(offset, offset + pageSize);
            console.log(result);
            res.render('backstage/layout/users', {
                title: '用户管理列表',
                users: result,
                currentPage: pageNum,
                totalPage: Math.ceil(results.length / pageSize)
            });
        }
    })
});
router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    Users.findOne(req, res, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('backstage/layout/userAdd', {
                users: users[0]
            });
        }
    }, id);
});
router.get('/add', function (req, res) {

    res.render('backstage/layout/userAdd', {
        users: {}
    });
});
router.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    Users.findOne(req, res, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length) {
                Users.delete(req, res, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backstage/users?pageNum=1');
                    }
                }, id)
            }
        }
    }, id);
});
router.post('/add', upload.single('avatarWeb'), function (req, res) {
    var users = req.body;
    console.log(users);
    if (users.id) {
        Users.update(req, res, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/backstage/users?pageNum=1');
            }
        });
    } else {
        delete users.id;
        Users.create(req, res, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result) {
                    res.redirect('/backstage/users?pageNum=1');
                } else {
                    res.redirect('back');
                }
            }
        });
    }
});
router.get('/detail/:id', function (req, res){
    var id = req.params.id;
    var array = [];
    My_bank.findOne(req, res, function (err, result){
        if(err) {
            console.log(err);
        }else {
            if(result.length) {
                array.push(result);
                My_account.findOne(req, res, function (err, value){
                    if(err) {
                        console.log(err);
                    }else {
                        if(value.length) {
                            array.push(value);
                            res.render('backstage/layout/userDetail',{
                                result:array[0][0],
                                value: array[1][0]
                            });
                        }
                    }
                }, id);
            }
        }
    }, id)
});
// 群发消息
router.post('/send', function (req, res){
    Message.create(req, res, function (err, result){
        if(err) {
            console.log(err);
        }else {
            if(result) {
                res.send({
                    code: '1'
                })
            }else {
                res.send({
                    code: '0'
                });
            }
        }
    })
});
module.exports = router;