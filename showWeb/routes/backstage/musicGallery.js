/**
 * Created by wanhua on 2017/6/8.
 */
var express = require('express');
var router = express.Router();
var MusicGallery = require('../../model/musicGallery');
var multer = require('multer');
var upload = multer({dest: 'public/photo/music'});

router.get('/', function (req, res) {
    var pageSize = 5;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    MusicGallery.findAll(req, res, function (err, musics) {
        if (err) {
            console.log(err);
        } else {
            var results = musics.slice(index, index + pageSize);
            res.render('backstage/layout/musicGallery', {
                title: '商业音乐库管理',
                musics: results,
                currentPage: pageNum,
                totalPage: Math.ceil(musics.length / pageSize)
            });
        }
    })
});
router.get('/add', function (req, res){
    res.render('backstage/layout/musicGalleryAdd', {
        music: {}
    });
});
router.get('/update/:_id', function (req, res) {
    var id = req.params._id;
    MusicGallery.findOne(req, res, function (err, music) {
        if (err) {
            console.log(err);
        } else {
            res.render('backstage/layout/musicGalleryAdd', {
                music: music[0]
            });
        }
    },id);
});

router.post('/add', upload.single('photo'), function (req, res){
    var music = req.body;
    if(music.id) {
        MusicGallery.update(req, res, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/backstage/musicGallery?pageNum=1');
            }
        })
    }else {
        delete music.id;
        MusicGallery.create(req, res, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                if (results) {
                    console.log('添加成功');
                    res.redirect('/backstage/musicGallery?pageNum=1');
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
    MusicGallery.findOne(req, res, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            if(doc) {
                MusicGallery.delete(req, res, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/backstage/musicGallery?pageNum=1');
                    }
                },id)
            }
        }
    },id)
});
module.exports = router;
