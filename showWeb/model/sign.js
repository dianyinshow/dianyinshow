/**
 * Created by wanhua on 2017/6/2.
 */
var mysql = require('mysql');
var dbConfig = require("../config/database");
//使用连接池
var moment = require('moment');
var UUID = require('uuid');
var pool = mysql.createPool(dbConfig.showMysql);

module.exports = {
    addUserOs: function (req, res, callback) {
        var id = UUID.v1();
        id = id.replace(/-/g, '0');
        var user = req.body;
        user.id = id;
        user.avatar = '/backstage-assets/img/user05.png';
        user.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        user.role = '系统管理员';
        var data = base.formatDbString(user, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.userOs_table + " SET " + data.queryString;
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    infoUserOs: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var user = req.body;
            var sql = "select * from " + dbConfig.tables.userOs_table + " where name='" + user.name + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findUserOs: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var user = req.body;
            var sql = "select * from " + dbConfig.tables.userOs_table + " where name='" + user.name + "'" + " and password='" + user.password + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
};
