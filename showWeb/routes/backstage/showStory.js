/**
 * Created by wanhua on 2017/6/11.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var upload = multer({dest: 'public/photo/show'});
var CommunityCon = require('../../model/backstage_communityCon');
var Community = require('../../model/backstage_community');

router.get('/', function (req, res) {
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    CommunityCon.findAll(req, res, function (err, story) {
        if (err) {
            console.log(err);
        } else {
            var results = story.slice(index, index + pageSize);
            res.render('backstage/layout/showStory', {
                title: '前端展示发布系统',
                story: results,
                currentPage: pageNum,
                totalPage: Math.ceil(story.length / pageSize)
            });
        }
    })
});
router.get('/add', function (req, res) {
    res.render('backstage/layout/showStoryAdd', {
        story: {}
    });
});
router.get('/update/:_id', function (req, res) {
    var id = req.params._id;
    CommunityCon.findOne(req, res, function (err, story) {
        if (err) {
            console.log(err);
        } else {
            res.render('backstage/layout/showStoryAdd', {
                story: story[0]
            });
        }
    }, id);
});
router.post('/add', upload.single('photo'), function (req, res) {
    var story = req.body;
    var id = story.id;
    if (story.id) {
        CommunityCon.update(req, res, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/backstage/showStory?pageNum=1');
            }
        }, id);
    } else {
        delete story.id;
        Community.create(req, res, function (err, result, id){
            CommunityCon.create(req, res, function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result) {
                            console.log('添加成功');
                            res.redirect('/backstage/showStory?pageNum=1');
                        } else {
                            console.log('添加的内容不存在');
                            res.redirect('back');
                        }
                    }
                }
            }, id)
        });

    }
});
router.get('/delete/:_id', function (req, res) {
    var id = req.params._id;
    CommunityCon.findOne(req, res, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc) {
                CommunityCon.delete(req, res, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backstage/showStory?pageNum=1');
                    }
                }, id)
            }
        }
    }, id)
});

module.exports = router;