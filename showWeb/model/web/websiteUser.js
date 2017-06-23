var mysql = require('mysql');
var dbConfig = require("../../config/database");
//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
//使用uuid
var uuid = require('uuid');
var moment = require('moment'); //时间格式化

module.exports = {

    //用户通过手机号登录
    loginWebByMobile:function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var userInfo = req.body;//获取url中的id参数
            var sql = "select * from " + dbConfig.tables.user_table + " where mobile='" + userInfo.mobile + "' and password='"+userInfo.password+"'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //用户通过邮箱登录
    loginWebByEmail:function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var userInfo = req.body;//获取url中的id参数
            var sql = "select * from " + dbConfig.tables.user_table + " where email='" + userInfo.email + "' and password='"+userInfo.password+"'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //通过用户id获取用户信息
    findWebUserInfoById: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var userId = req.query.id;//获取url中的id参数
            var sql = "select * from " + dbConfig.tables.user_table + " where id='" + userId + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //用户手机号验证
    findWebUserByMobile: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var mobile = req.query.mobile;//获取url中的mobile参数
            var sql = "select mobile from " + dbConfig.tables.user_table + " where mobile='" + mobile + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //用户邮箱验证
    findWebUserByEmail: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var email = req.query.email;//获取url中的email参数

            //查询邮箱在数据库中是否存在
            var query = {email: email};

            var sql = "select email from " + dbConfig.tables.user_table + " where email='" + query.email + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //用户昵称验证
    findWebUserByUserName: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var username = req.query.username;//获取url中的username参数
            //查询昵称在数据库中是否存在
            //var query = {username: username}
            var sql = "select username from " + dbConfig.tables.user_table + " where username='" + username + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //用户通过手机号注册
    insertWebUserByMobile: function (req, res, callback) {
        //获取表单提交的内容
        var userInfo = req.body;
        userInfo.createTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        //console.log(userInfo.createTime);
        //userInfo.password = md5(userInfo.password);//对用户的密码进行加密
        userInfo.id = uuid.v1().replace(/\-/g,'0');
        //console.log(userInfo.id);
        //var data = base.formatDbString(user, " ,");
        pool.getConnection(function (err, connection) {

            var sql = "INSERT INTO " + dbConfig.tables.user_table + " SET ?";
            //var val = data.values;
            console.log(userInfo);
            connection.query(sql, userInfo, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //用户通过邮箱注册
    insertWebUserByEmail: function (req, res, callback) {
        //获取表单提交的内容
        var userInfo = req.body;
        userInfo.createTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        console.log(userInfo.createTime);
        userInfo.id = uuid.v1().replace(/\-/g,'0');
        console.log(userInfo);
        //res.send("1");
        //var data = base.formatDbString(user, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.user_table + " SET ?";
            //var val = data.values;
            console.log(userInfo);
            connection.query(sql, userInfo, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //通过用户id修改用户手机号
    updateWebUserMobileById: function (req, res, callback) {
        //获取表单提交的内容
        var userInfo = req.body;//获取url中的mobile参数
        userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " SET mobile=? , updateTime=? where id=?";
            var user = [userInfo.mobile,userInfo.updateTime,userInfo.id];
            console.log(user);
            connection.query(sql, user, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //通过用户id修改用户邮箱
    updateWebUserEmailById: function (req, res, callback) {
        //获取表单提交的内容
        var userInfo = req.body;//获取url中的mobile参数
        userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " SET email=? , updateTime=? where id=?";
            var user = [userInfo.email,userInfo.updateTime,userInfo.id];
            console.log(user);
            connection.query(sql, user, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //通过用户id修改用户密码
    updateWebUserPasswordById: function (req, res, callback) {
        //获取表单提交的内容
        var userInfo = req.body;//获取url中的mobile参数
        userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " SET password=? , updateTime=? where id=?";
            var user = [userInfo.password,userInfo.updateTime,userInfo.id];
            //console.log(user);
            connection.query(sql, user, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //通过用户邮箱修改用户密码
    updateWebUserPasswordByEmail: function (req, res, callback) {
        //获取表单提交的内容
        var userInfo = req.body;//获取url中的mobile参数
        userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " SET password=? , updateTime=? where email=?";
            var user = [userInfo.password,userInfo.updateTime,userInfo.email];
            //console.log(user);
            connection.query(sql, user, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //通过用户手机号修改用户密码
    updateWebUserPasswordByMobile: function (req, res, callback) {
        //获取表单提交的内容
        var userInfo = req.body;//获取url中的mobile参数
        userInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " SET password=? , updateTime=? where mobile=?";
            var user = [userInfo.password,userInfo.updateTime,userInfo.mobile];
            //console.log(user);
            connection.query(sql, user, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },


};