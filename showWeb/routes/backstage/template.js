/**
 * Created by wanhua on 2017/6/21.
 */
/**
 * Created by wanhua on 2017/6/20.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var upload = multer({dest: 'public/photo/show'});
var Template = require('../../model/template');
router.get('/', function (req, res){
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    Template.findAll(req, res, function (err, results){
        if(err) {
            console.log(err);
        }else {
            var result = results.slice(index, index + pageSize);
            res.render('backstage/layout/template', {
                title: '模板管理系统',
                template: result,
                currentPage: pageNum,
                totalPage: Math.ceil(results.length / pageSize)
            });
        }
    })
});

router.get('/add', function (req, res) {
    res.render('backstage/layout/templateAdd', {
        template: {}
    });
});
router.get('/update/:id', function (req, res) {
    var id = req.params.id;
    Template.findOne(req, res, function (err, template) {
        if (err) {
            console.log(err);
        } else {
            res.render('backstage/layout/templateAdd', {
                template: template[0]
            });
        }
    },id);
});
router.post('/add', function (req, res) {
    var temp = req.body;
    if(temp.id) {
        Template.update(req, res, function (err,result){
            if(err) {
                console.log(err);
            }else {
                res.redirect('/backstage/template?pageNum=1');
            }
        })
    }else {
        delete temp.id;
        Template.create(req, res, function (err, result){
            if(err) {
                console.log(err);
            }else {
                if (result) {
                    console.log('添加成功');
                    res.redirect('/backstage/template?pageNum=1');
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
    Template.findOne(req, res, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if(result.length){
                Template.delete(req, res, function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backstage/template?pageNum=1');
                    }
                },id)
            }
        }
    },id)
});
module.exports = router;