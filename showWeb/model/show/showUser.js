/**
 * Created by wanhua on 2017/6/22.
 */
var mysql = require('mysql');
var dbConfig = require("../../config/database");
//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
//使用uuid
var uuid = require('uuid');
var moment = require('moment'); //时间格式化
module.exports = {
    findById: function (req, res, callback){
        pool.getConnection(function (err, connection) {
            console.log(req.session.user);
            var userId = req.session.user[0].id;//获取url中的id参数
            // var userId = '22b478a00564e011e70a77107178bdf80721';
            var sql = "select * from " + dbConfig.tables.user_table + " where id='" + userId + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var userId = req.session.user[0].id;
        // var userId = '22b478a00564e011e70a77107178bdf80721';
        var user = req.body;
        user.avatarWeb = '/' + req.file.filename;
        var data = base.formatDbString(user, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " set " + data.queryString + " where id='" + userId + "'";
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    updateAll: function (req, res, callback){
        var userId = req.session.user[0].id;
        // var userId = '22b478a00564e011e70a77107178bdf80721';
        var user = req.body;
        var data = base.formatDbString(user, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " set " + data.queryString + " where id='" + userId + "'";
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};