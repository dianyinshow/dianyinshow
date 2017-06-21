/**
 * Created by wanhua on 2017/6/8.
 */
var express = require('express');
var router = express.Router();
var PhotoGallery = require('../../model/photoGallery');
var multer = require('multer');
var upload = multer({dest: 'public/photo/photos'});

router.get('/', function (req, res) {
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    PhotoGallery.findAll(req, res, function (err, photos) {
        if (err) {
            console.log(err);
        } else {
            var results = photos.slice(index, index + pageSize);
            res.render('backstage/layout/photoGallery', {
                title: '商业图片库管理',
                photos: results,
                currentPage: pageNum,
                totalPage: Math.ceil(photos.length / pageSize)
            });
        }
    })
});
router.get('/add', function (req, res) {
    res.render('backstage/layout/photoGalleryAdd', {
        photo: {}
    });
});
router.get('/update/:_id', function (req, res) {
    var id = req.params._id;
    PhotoGallery.findOne(req, res, function (err, photo) {
        if (err) {
            console.log(err);
        } else {
            res.render('backstage/layout/photoGalleryAdd', {
                photo: photo[0]
            });
        }
    },id);
});
router.post('/add', upload.single('photo'), function (req, res) {
    var photo = req.body;
    if(photo.id) {
        PhotoGallery.update(req, res, function (err, result){
            if(err) {
                console.log(err);
            }else {
                res.redirect('/backstage/photoGallery?pageNum=1');
            }
        })
    }else {
        delete photo.id;
        PhotoGallery.create(req, res, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                if (results) {
                    console.log('添加成功');
                    res.redirect('/backstage/photoGallery?pageNum=1');
                } else {
                    console.log('添加的内容不存在');
                    res.redirect('back');
                }
            }
        });
    }

});
router.get('/delete/:_id', function (req, res) {
    var id = req.params._id;
    PhotoGallery.findOne(req, res, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if(result.length) {
                PhotoGallery.delete(req, res, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backstage/photoGallery?pageNum=1');
                    }
                },id)
            }
        }
    },id)
});
module.exports = router;