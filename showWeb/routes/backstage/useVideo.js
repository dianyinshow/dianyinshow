/**
 * Created by wanhua on 2017/6/15.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var upload = multer({dest: 'public/photo/show'});
var UseVideo = require('../../model/backstage_useVideo');

router.get('/', function (req, res) {
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    UseVideo.find(req, res, function (err, videos) {
        if (err) {
            console.log(err);
        } else {
            var results = videos.slice(index, index + pageSize);
            res.render('backstage/layout/useVideo', {
                title: '使用教程',
                videos: results,
                currentPage: pageNum,
                totalPage: Math.ceil(videos.length / pageSize)
            });
        }
    })
});
router.get('/add', function (req, res) {
    res.render('backstage/layout/useVideoAdd', {
        video: {}
    });
});
router.get('/update/:_id', function (req, res) {
    var id = req.params._id;
    UseVideo.findOne(req, res, function (err, videos) {
        if (err) {
            console.log(err);
        } else {
            res.render('backstage/layout/useVideoAdd', {
                video: videos[0]
            });
        }
    }, id);
});
router.post('/add', upload.array('file'), function (req, res) {
    var video = req.body;
    var id = video.id;
    if (video.id) {
        UseVideo.update(req, res, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/backstage/useVideo?pageNum=1');
            }
        }, id);
    } else {
        delete video.id;
        UseVideo.create(req, res, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result) {
                    console.log('添加成功');
                    res.redirect('/backstage/useVideo?pageNum=1');
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
    UseVideo.findOne(req, res, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if (doc) {
                UseVideo.delete(req, res, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backstage/useVideo?pageNum=1');
                    }
                }, id)
            }
        }
    }, id)
});
module.exports = router;