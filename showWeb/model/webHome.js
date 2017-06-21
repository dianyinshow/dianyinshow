/**
 * Created by wanhua on 2017/6/6.
 */
var mysql = require('mysql');
var dbConfig = require("../config/database");
var moment = require('moment');
var  UUID = require('uuid');

//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
module.exports = {
    findAll: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.webHome_table;
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
        var show = req.body;
        show.id = id;
        show.photo = '' + req.file.filename;
        show.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        var data = base.formatDbString(show, " ,");
        console.log(data);
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.webHome_table + " SET " + data.queryString;
            console.log(sql);
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findOne: function (req, res, callback, id) {
        // var id = req.session.user.id;
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.webHome_table + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var show = req.body;
        show.photo = '' + req.file.filename;
        var data = base.formatDbString(show, " ,");
        var id = show.id;
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.webHome_table + " set " + data.queryString + " where id='" + id + "'";
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
            var sql = "delete from " + dbConfig.tables.webHome_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};