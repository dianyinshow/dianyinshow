/**
 * Created by wanhua on 2017/6/12.
 */
/* 官网用户登录注册修改个人信息 */
var express = require('express');
var moment = require('moment'); //时间格式化
var router = express.Router();
var md5 = require('../../md5/md5');//引入md5加密
var userModel = require('../../model/web/websiteUser');
var IHuyi = require("ihuyi106");
var transporter = require('../../mail/mail').transporter;


//纯数字验证

function judgeIsNum(srt) {
    var pattern = /^\d+$/g;  //正则表达式 ^ 代表从开始位置起   $ 末尾   + 是连续多个  \d 是数字
    var result = srt.match(pattern);//match 是匹配的意思   用正则表达式来匹配
    if (result == null) {
        return false;
    } else {
        return true;
    }
}

//随机生成验证码
function mathRand(num) {
    var code = "";
    for (var i = 0; i < num; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

//注册手机号验证
//localhost:3000/webIndex/user/reg/mobile?mobile=13522572086
router.get('/reg/mobile', function (req, res) {
    //需求：查询手机号在数据库中是否存在
    userModel.findWebUserByMobile(req, res, function (err, result) {
        if (!err) {
            if (result.length) {//数据库中已经有该昵称
                console.log("该手机号已注册！");
                res.send("1");
            } else {//没有该昵称
                console.log("手机号未注册！");
                res.send("0");
            }
        } else {
            console.log(err);
            res.redirect('back');
        }
    });
});

//手机验证码校验
router.get('/mobile/code', function (req, res) {
    var userMobileCode = req.query.mobileCode;
    console.log("手机用户验证码：" + userMobileCode);
    console.log("手机后台验证码：" + req.session.mobileCode);
    if (userMobileCode == req.session.mobileCode) {
        res.send("1");

    } else {
        res.send("0");
    }
});

//发送手机验证码
router.post('/mobile/code', function (req, res) {
    var codeAuthInfo = req.body;
    var account = "C08442369";
    var password = "43f94befe055bd53665dc4fc7e696e22";
    var mobileCode = mathRand(4);//随机验证码
    req.session.mobileCode = mobileCode;
    console.log("手机后台生成验证码：" + req.session.mobileCode);
    //var mobile = "13400133993";
    var content = "您的验证码是：" + mobileCode + "。请不要把验证码泄露给其他人。";
    var iHuyi = new IHuyi(account, password);
    iHuyi.send(codeAuthInfo.mobile, content, function (err, smsId) {
        if (err) {
            console.log(err.message);
            res.send("0");
        } else {
            console.log("SMS sent, and smsId is " + smsId);
            res.send(content);
        }
    });
});

//邮箱验证码校验
router.get('/email/code', function (req, res) {
    var userEmailCode = req.query.emailCode;
    console.log("邮箱用户验证码：" + userEmailCode);
    console.log("邮箱后台验证码：" + req.session.emailCode);
    if (userEmailCode == req.session.emailCode) {
        res.send("1");

    } else {
        res.send("0");
    }
});

//发送邮箱验证码
router.post('/email/code', function (req, res) {
    var codeAuthInfo = req.body;
    var emailCode = mathRand(4);
    req.session.emailCode = emailCode;
    console.log("邮箱后台生成验证码：" + req.session.emailCode);
    console.log(codeAuthInfo.email);
    //var mobile = "13400133993";
    var content = "您的验证码是：" + emailCode + "。请不要把验证码泄露给其他人。";
    var mailOptions = {
        from: '2487636802@qq.com', // 发件地址
        to: codeAuthInfo.email, // 收件列表
        subject: '金手掌官网', // 标题
        //text和html两者只支持一种
        text: content, // 标题
        html: '<b>' + content + '</b>' // html 内容
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
            res.send("0");
        }
        console.log('Message sent: ' + info.response);
        res.send(content);
    });
});

//注册邮箱验证
//localhost:3000/webIndex/user/reg/email?email=ab@163.com
router.get('/reg/email', function (req, res) {
    //根据邮箱查找
    userModel.findWebUserByEmail(req, res, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length) {
                console.log("邮箱已被注册");
                res.send("1");
            } else {
                console.log("邮箱可用！");
                res.send("0");
            }
        }
    });
});


//注册昵称验证
//localhost:3000/webIndex/user/reg/username?username=hhh
router.get('/reg/username', function (req, res) {
    userModel.findWebUserByUserName(req, res, function (err, result) {
        if (!err) {
            if (result.length) {//数据库中已经有该昵称
                console.log("昵称被占用！");
                res.send("1");
            } else {//没有该昵称
                console.log("昵称可用！");
                res.send("0");
            }
        } else {
            console.log(err);
            res.redirect('back');
        }
    });
});

//邮箱注册
// localhost:3000/webIndex/user/reg/email
// {"username":"张三", "password":"1234abc","email":"123@163.com"}
router.post('/reg/email', function (req, res) {
    //console.log(req.body);
    userModel.insertWebUserByEmail(req, res, function (err, result) {
        if (!err) {
            console.log("邮箱注册成功！");
            res.send('1');
        } else {
            console.log("邮箱注册失败！");
            console.log(err);
            res.send('0');
            //res.redirect('back');
        }
    });
});


//手机号注册
// localhost:3000/webIndex/user/reg/mobile
// {"username":"huiyuanjian", "password":"1234abcd","mobile":"12345678332"}
router.post('/reg/mobile', function (req, res) {
    userModel.insertWebUserByMobile(req, res, function (err, result) {
        if (!err) {
            console.log("手机号注册成功！");
            res.send('1');
        } else {
            console.log("手机号注册失败！");
            console.log(err);
            res.send('0');
            //res.redirect('back');
        }
    });
});


//手机号登录
router.post('/login/mobile', function (req, res, next) {
    //var userInfo = req.body;
    //userInfo.password = md5(userInfo.password);//对用户的密码进行加密
    //console.log(userInfo.password);
    userModel.loginWebByMobile(req,res, function (err, doc) {
        if (!err) {//数据库查询成功
            console.log(doc);
            doc = JSON.stringify(doc);
            if (doc != '[]') {//
                console.log('登录成功！' + doc);
                req.session.user = JSON.parse(doc);
                console.log(req.session.user);
                //res.redirect('/webIndex/show/myshow');
                res.send(req.session.user);
            } else {
                res.send("0");
            }
        } else {//数据库查询失败
            console.log('数据库中查找用户信息失败' + err);  //数据库未开等原因或者查询语法错误
            res.redirect('back');//返回到当前页
        }
    });
});


//邮箱登录
router.post('/login/email', function (req, res, next) {
    //var userInfo = req.body;
    //userInfo.password = md5(userInfo.password);//对用户的密码进行加密
    //console.log(userInfo.password);
    userModel.loginWebByEmail(req,res, function (err, doc) {
        if (!err) {//数据库查询成功
            console.log(doc);
            doc = JSON.stringify(doc);
            if (doc != '[]') {//
                console.log('邮箱登录成功！' + doc);
                req.session.user = JSON.parse(doc);
                console.log(req.session.user);
                res.send(req.session.user);
            } else {
                res.send("0");
            }
        } else {//数据库查询失败
            console.log('数据库中查找用户信息失败' + err);  //数据库未开等原因或者查询语法错误
            res.redirect('back');//返回到当前页
        }
    });
});


//登录邮箱验证
//localhost:3000/webIndex/user/login/email?email=hui1@153.com
router.get('/login/email', function (req, res, next) {
    userModel.findWebUserByEmail(req, res, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length) {
                console.log("邮箱已被注册");
                res.send("1");
            } else {
                console.log("邮箱未注册！");
                res.send("0");
            }
        }
    });
});

//登录手机验证
//localhost:3000/webIndex/user/login/mobile?mobile=13522572089
router.get('/login/mobile', function (req, res, next) {
    userModel.findWebUserByMobile(req, res, function (err, result) {
        if (!err) {
            if (result.length) {//数据库中已经有该昵称
                console.log("该手机号已注册！");
                res.send("1");
            } else {//没有该昵称
                console.log("手机号未注册！");
                res.send("0");
            }
        } else {
            console.log(err);
            res.redirect('back');
        }
    });
});


// 通过用户id修改手机号
// user中传数据库中对应的字段 id mobile
// 传入的json数据格式{"id":"5934bb624e94d30a5ce4241b", "mobile":"12345678332"}
// 返回值： 1 修改成功  0 修改失败
//localhost:3000/webIndex/user/update/mobile
//{"id":"63e4155005113011e7096760a92994", "mobile":"12345678332"}
router.post('/update/mobile', function (req, res, next) {
    userModel.updateWebUserMobileById(req, res, function (err, result) {
        if (!err) {
            console.log(result);
            res.send("1");
        } else {
            console.log(err);
            res.send("0");
        }
    });
});


//通过用户id修改用户邮箱
//user中传数据库中对应的字段 id email
//localhost:3000/webIndex/user/update/email
//{"id":"5934bb624e94d30a5ce4241b", "email":"12345678332@163.com"}
router.post('/update/email', function (req, res, next) {
    userModel.updateWebUserEmailById(req, res, function (err, result) {
        if (!err) {
            console.log(result);
            res.send("1");
        } else {
            console.log(err);
            res.send("0");
        }
    });
});

//根据用户id修改密码
//user中传数据库中对应的字段 id password
//localhost:3000/webIndex/user/update/password
//{"id":"d19b8bf005113011e70af2f0b1d38d", "password":"123@163.com"}
router.post('/update/password', function (req, res, next) {
    userModel.updateWebUserPasswordById(req, res, function (err, result) {
        if (!err) {
            console.log(result);
            res.send("1");
        } else {
            console.log(err);
            res.send("0");
        }
    });
});

//根据用户邮箱修改密码
//user中传数据库中对应的字段 email password
//localhost:3000/webIndex/user/update/password/email
//{"email":"123@163.com", "password":"12345678"}
router.post('/update/password/email', function (req, res, next) {
    //获取url中的参数
    var userInfo = req.body;
    userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    //user.password = md5(user.password);//对用户的密码进行加密
    //console.log(req.body);
    console.log(req.session.emailCode);
    console.log(userInfo.emailCode);
    if (userInfo.emailCode == req.session.emailCode) {
        userModel.updateWebUserPasswordByEmail(req, res, function (err, result) {
            if (!err) {
                console.log(result);
                res.send("1");
            } else {
                console.log(err);
                res.send("0");
            }
        });
    } else {
        console.log("验证码错误！");
        res.send("0");
    }
});


// 根据用户手机号修改密码
// user中传数据库中对应的字段 mobile password
// localhost:3000/webIndex/user/update/password/mobile
// {"mobile":"13522572084", "password":"12348aaa"}
router.post('/update/password/mobile', function (req, res, next) {
    //获取url中的参数
    var userInfo = req.body;
    userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    //user.password = md5(user.password);//对用户的密码进行加密
    //console.log(req.body);
    console.log(req.session.mobileCode);
    console.log(userInfo.mobileCode);
    if (userInfo.mobileCode == req.session.mobileCode) {
        userModel.updateWebUserPasswordByMobile(req, res, function (err, result) {
            if (!err) {
                console.log(result);
                res.send("1");
            } else {
                console.log(err);
                res.send("0");
            }
        });
    } else {
        console.log("验证码错误！");
        res.send("0");
    }
});

//通过用户id获取用户信息
//localhost:3000/webIndex/user/get/user?id=73d755d005113011e70922d01d78a4
//[{"id":"73d755d005113011e70922d01d78a4","username":"hh","password":"1234abc","email":"123@163.com","mobile":"","createTime":"2017-06-14T15:09:24.000Z","updateTime":"2017-06-14T15:09:24.000Z"}]
router.get('/get/user', function (req, res) {
    userModel.findWebUserInfoById(req, res, function (err, doc) {
        if (!err) {
            if (doc) {
                console.log(doc);

                res.send(JSON.stringify(doc));
            } else {
                res.send("0");
            }
        } else {
            console.log('数据库中查找用户信息失败' + err);  //数据库未开等原因
            res.redirect('back');//返回到当前页
        }
    });
});

//退出
router.get('/logout', function (req, res) {
    req.session.user = null;//清空session中的登陆信息
    res.redirect('/');
});
// 修改昵称
// user中传数据库中对应的字段 id username
// {"id":"5934bb624e94d30a5ce4241b", "username":"hyj"}

/*router.post('/update/username', function (req, res, next) {
 //获取url中的参数
 var userInfo = req.body;
 userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
 userModel.update({"_id": userInfo.id}, {$set: {"username":userInfo.username,"updateTime":userInfo.updateTime}}, function (err, doc) {
 if (!err) {
 res.send("1");
 } else {
 res.send("0");
 }
 });
 });*/

// 根据id修改个人信息
// user中传数据库中对应的字段 id
// {"id":"5934bb624e94d30a5ce4241b", "username":"哈哈哈"}
/*router.post('/update/user', function (req, res, next) {
 //获取url中的参数
 var userInfo = req.body;
 userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
 userModel.update({"_id": userInfo.id}, {$set: userInfo}, function (err, doc) {
 if (!err) {
 //res.writeHead(200, {'content-type': 'application/json;charset=utf8'});
 //console.log(doc);
 res.send("1");
 } else {
 res.send("0");
 }
 });
 });*/



// 根据用户id删除用户信息
// user中传数据库中对应的字段 id 固定
// {"id":"5934bb624e94d30a5ce4241b"}
/*router.post('/delete/user', function (req, res, next) {
 //获取url中的参数
 var userInfo = req.body;
 //userInfo.deleteTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
 userModel.remove({"_id": userInfo.id},function (err, doc) {
 if (!err) {
 //console.log(doc);
 res.send("1");
 } else {
 res.send("0");
 }
 });
 });*/


module.exports = router;