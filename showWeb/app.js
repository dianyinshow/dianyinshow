var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment = require('moment');

global.inspect = require('util').inspect;
global.base = require('./model/base.js');

var index = require('./routes/backstage/index');
var sign = require('./routes/backstage/sign');
var userOs = require('./routes/backstage/userOs');
var manage = require('./routes/backstage/manage');
var show = require('./routes/backstage/show');
var first = require('./routes/backstage/first');
var photoGallery = require('./routes/backstage/photoGallery');
var musicGallery = require('./routes/backstage/musicGallery');
var users = require('./routes/backstage/users');
var showStory = require('./routes/backstage/showStory');
var useVideo = require('./routes/backstage/useVideo');
var template = require('./routes/backstage/template');

var webIndex = require('./routes/website/index');
var webUser = require('./routes/website/webRouteUser');
var webShowMyShow = require('./routes/website/show/myshow');
var webShowIndex = require('./routes/website/show/index');
var webLogin = require('./routes/website/index/login');
var webReg = require('./routes/website/index/register');
var webRegMobileVerify = require('./routes/website/index/regMobileVerify');
var webRegMobile = require('./routes/website/index/regMobile');
var webRegEmail = require('./routes/website/index/regEmail');
var webConList = require('./routes/website/index/conlist');
var webComShow = require('./routes/website/index/comshow');
var webComment = require('./routes/website/index/comment');
//var newApp = require('./routes/app/app');

var community = require('./routes/website/community');
var fun = require('./routes/website/index/fun');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'wh',//加密的cookie的密钥
    cookie: {httpOnly: true},//httpOnly=true的时候就客户端js无法读取cookie
    resave: true,//每次访问客户端服务器的时候都会重新保存一次会话对象
    saveUninitialized: true,//保存未使用过的session对象
}));
//官网首页
app.use('/', webIndex);

app.use(function (req, res, next) {
    res.locals.success = req.session.success;
    res.locals.error = req.session.error;
    //把回话对象的user属性取出来 赋给res.locals
    res.locals.user = req.session.userOs;
    req.session.success = req.session.error = null;
    next();
});

app.use('/backstage', index);
app.use('/backstage/sign', sign);
app.use('/backstage/first', first);
app.use('/backstage/userOs', userOs);
app.use('/backstage/manage', manage);
app.use('/backstage/show', show);
app.use('/backstage/photoGallery', photoGallery);
app.use('/backstage/musicGallery', musicGallery);
app.use('/backstage/users', users);
app.use('/backstage/showStory', showStory);
app.use('/backstage/useVideo', useVideo);
app.use('/backstage/template', template);

app.use('/website/reg', webReg);
app.use('/website/reg/regMobileVerify', webRegMobileVerify);
app.use('/website/reg/regMobile', webRegMobile);
app.use('/website/reg/regEmail', webRegEmail);
app.use('/website/user', webUser);
app.use('/website/login', webLogin);//官网登录路由
app.use('/website/show/myShow', webShowMyShow);
app.use('/website/show/index', webShowIndex);
app.use('/website/comshow/conlist', webConList);
app.use('/website/comshow', webComShow);
app.use('/website/community', community);
app.use('/website/fun', fun);
app.use('/website/comment', webComment);//评论
//app.use('./app/app',newApp);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
