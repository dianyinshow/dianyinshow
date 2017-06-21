/**
 * Created by wanhua on 2017/6/2.
 */
var mysql = require('mysql');
var dbConfig = require("../config/database");
//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
module.exports = {
    list: function (req, res, callback) {
        var pn = req.query.pageNum;
        if (base.isEmpty(pn) || pn <= 0) {
            pn = 1;
        }
        var limit = 10;
        var offset = (parseInt(pn) - 1) * limit;
        var where = ' WHERE 1=1';
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.user_table + where + " limit " + offset + "," + limit;
            console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findAll: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.user_table;
            connection.query(sql, function (err, result) {
                console.log(result);
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findOne: function (req, res, callback, id) {
        // var id = req.session.user.id;
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.userOs_table + " where id=" + id;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var user = req.body;
        var authority = req.session.user.authority;
        user.avatar = '/photo/userOs/' + req.file.filename;
        if (authority == 1) {
            req.session.user.avatar = user.avatar;
            req.session.user.name = user.name;
        }
        var id = user.id;
        var data = base.formatDbString(user, " ,");
        console.log(data);
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.userOs_table + " set " + data.queryString + " where id=" + id;
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};
