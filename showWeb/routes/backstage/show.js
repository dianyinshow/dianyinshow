/**
 * Created by wanhua on 2017/5/27.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var upload = multer({dest: 'public/photo/show'});
var WebHome = require('../../model/webHome');

router.get('/', function (req, res) {
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    WebHome.findAll(req, res, function (err, results){
        if(err) {
            console.log(err);
        }else {
            var result = results.slice(index, index + pageSize);
            res.render('backstage/layout/show', {
                title: '前端展示发布系统',
                show: result,
                currentPage: pageNum,
                totalPage: Math.ceil(results.length / pageSize)
            });
        }
    })
});

router.get('/add', function (req, res) {
    res.render('backstage/layout/showAdd', {
        show: {}
    });
});

router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    WebHome.findOne(req, res, function (err, show) {
        if (err) {
            console.log(err);
        } else {
            res.render('backstage/layout/showAdd', {
                show: show[0]
            });
        }
    },id);
});

router.post('/add', upload.single('photo'), function (req, res) {
    var show = req.body;
    if(show.id) {
        WebHome.update(req, res, function (err,result){
            if(err) {
                console.log(err);
            }else {
                res.redirect('/backstage/show?pageNum=1');
            }
        })
    }else {
        delete show.id;
        WebHome.create(req, res, function (err, result){
            if(err) {
                console.log(err);
            }else {
                if (result) {
                    console.log('添加成功');
                    res.redirect('/backstage/show?pageNum=1');
                } else {
                    console.log('添加的内容不存在');
                    res.redirect('back');
                }
            }
        })
    }
});

router.get('/delete/:_id', function (req, res) {
    var id = req.params._id;
    WebHome.findOne(req, res, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if(result.length){
                WebHome.delete(req, res, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backstage/show?pageNum=1');
                    }
                },id)
            }
        }
    },id)
});

module.exports = router;
