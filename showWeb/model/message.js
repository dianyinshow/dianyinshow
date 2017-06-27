/**
 * Created by wanhua on 2017/6/22.
 */
var mysql = require('mysql');
var dbConfig = require("../config/database");
//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
//使用uuid
var UUID = require('uuid');
var moment = require('moment'); //时间格式化
module.exports = {
    findOne: function (req, res, callback, id){
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.message_table + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findAll: function (req, res, callback){
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.message_table + " where status=1 order by createTime desc";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findAllMess: function (req, res, callback){
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.message_table + " order by createTime desc ";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    create: function (req, res, callback){
        var id = UUID.v1();
        id = id.replace(/-/g, '0');
        var message = req.body;
        message.status = '1';
        message.id = id;
        message.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        var data = base.formatDbString(message, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.message_table + " SET " + data.queryString;
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback, id) {
        var message = {};
        message.status = '0';
        var data = base.formatDbString(message, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.message_table + " set " + data.queryString + " where id='" + id + "'";
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
};