/**
 * Created by wanhua on 2017/5/27.
 */
/* 登录注册界面 */
var express = require('express');
var router = express.Router();

var userOs = require('../../model/sign');

/* 渲染注册界面 */
router.get('/up', function (req, res) {
    res.render('backstage/sign/signup', {title: 'dianyinxiu'});
});
/* 渲染登录界面*/
router.get('/in', function (req, res) {
    res.render('backstage/sign/signin', {title: 'dianyinxiu'});
});
/* 登录 */
router.post('/in', function (req, res) {
    userOs.findUserOs(req, res, function (err, result){
        if(err) {
            console.log(err);
        }else {
            if(result.length) {
                console.log('登录成功');
                req.session.userOs = result[0];
                res.redirect('/backstage/first');
            }else {
                console.log('用户密码不正确');
                res.redirect('back');
            }
        }
    })
});
/* 注册 */
router.post('/up', function (req, res) {

   userOs.infoUserOs(req, res, function (err, result){
       if(err) {
           console.log(err);
       } else {
           if(result.length) {
               console.log('用户已经注册');
               res.redirect('back');
           }else {
               userOs.addUserOs(req, res, function (err, userOs) {
                   if(err) {
                       console.log(err);
                   }else {
                       if(userOs) {
                           console.log('注册成功');
                           res.redirect('/backstage/sign/in');
                       }
                   }
               })
           }
       }
   });
});
/* 推出 */
router.get('/out', function (req, res) {
    res.redirect('/backstage/sign/in');
});
module.exports = router;