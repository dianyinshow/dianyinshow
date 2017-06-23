/**
 * Created by wanhua on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/photo/show'});
var User = require('../../../model/show/showUser');
router.get('/', function (req, res){
    User.findById(req, res, function (err, result){
        if(err) {
            console.log(err);
        }else {
            if(result.length) {
                res.render('website/show/personal-center-header',{
                    user: result[0]
                });
            }else {
                console.log('用户不存在');
            }
        }
    });
});
router.post('/update', upload.single('file'), function (req, res){
    User.update(req, res, function (err, result){
        if(err) {
            console.log(err);
        }else {
            res.redirect('/website/show/personalCenter');
        }
    })
});
router.post('/updateAll', function (req, res){
    User.updateAll(req, res, function (err, result){
        if(err) {
            console.log(err);
        }else {
            if(result) {
                res.send({
                    code: '1'
                });
            }else {
                res.send({
                    code: '0'
                });
            }
        }
    });
});
module.exports = router;