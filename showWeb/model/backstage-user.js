/**
 * Created by wanhua on 2017/6/2.
 */
var mysql = require('mysql');
var dbConfig = require("../config/database");
var  UUID = require('uuid');
var moment = require('moment');
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
    create: function (req, res, callback) {
        var id = UUID.v1();
        id = id.replace(/-/g, '0');
        var users = req.body;
        users.id = id;
        console.log(users);
        users.avatarWeb = '' + req.file.filename;
        users.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        var data = base.formatDbString(users, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.user_table + " SET " + data.queryString;
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findOne: function (req, res, callback, id) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.user_table + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var users = req.body;
        users.avatarWeb = '/' + req.file.filename;
        var id = users.id;
        var data = base.formatDbString(users, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.user_table + " set " + data.queryString + " where id='" + id + "'";
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, callback, id){
        pool.getConnection(function (err, connection) {
            var sql = "delete from " + dbConfig.tables.user_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};
