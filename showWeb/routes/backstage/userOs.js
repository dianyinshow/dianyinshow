/**
 * Created by wanhua on 2017/5/27.
 */
/* 系统用户管理 界面*/
var express = require('express');
var router = express.Router();
var UserOs = require('../../model/userOs');
var multer = require('multer');
var upload = multer({dest: 'public/photo/userOs'});
router.get('/', function (req, res) {
    var authority = req.session.user.authority;
    if(authority == 0) {
        /*UserOs.find({}, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                res.render('backstage/layout/userOs', {
                    title: '系统用户管理',
                    user: user
                })
            }
        });*/
        UserOs.findAll(req, res, function (err, user){
            if(err) {
                console.log(err);
            }else {
                if(user.length) {
                    res.render('backstage/layout/userOs', {
                        title: '系统用户管理',
                        user: user
                    })
                }
            }
        })
    }else {
        /*UserOs.findOne({_id: id}, function (err, user) {
            if (err) {
                console.log(err);
            }
            else {
                res.render('backstage/layout/userOs', {
                    title: '系统用户管理',
                    user: user
                })
            }
        });*/
        var id = req.session.user.id;
        UserOs.findOne(req, res, function (err, user){
            if(err) {
                console.log(err);
            }else {
                res.render('backstage/layout/userOs', {
                    title: '系统用户管理',
                    user: user[0]
                })
            }
        }, id)
    }
});
router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    UserOs.findOne(req, res, function (err, user) {
        res.render('backstage/layout/userOsUpdate',{
            user: user[0]
        });
    }, id);
});
router.post('/update', upload.single('avatar'), function (req, res) {
    /*var user = req.body;
    var authority = req.session.user.authority;
    user.avatar = '/photo/userOs/' + req.file.filename;
    if(authority == 1) {
        req.session.user.avatar = user.avatar;
        req.session.user.name = user.name;
    }*/

    /*UserOs.update({_id: user._id}, {name: user.name, role: user.role, avatar: user.avatar}, function (err) {
        if (err) {
            res.redirect('back');
        }
        else {
            res.redirect('/backstage/userOs');
        }
    });*/
    UserOs.update(req, res, function (err, result){
        console.log(result);
        if (err) {
            res.redirect('back');
        }
        else {
            res.redirect('/backstage/userOs');
        }
    })
});
module.exports = router;
