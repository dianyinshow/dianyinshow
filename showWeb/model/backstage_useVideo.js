/**
 * Created by wanhua on 2017/6/15.
 */
var mysql = require('mysql');
var dbConfig = require("../config/database");
var moment = require('moment');
var  UUID = require('uuid');

//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
module.exports = {
    findAll: function (req, res, callback) {
        var html = req.query;
        if(html.type == '全部') {
            pool.getConnection(function (err, connection) {
                var sql = "select * from " + dbConfig.tables.useVideo_table ;
                connection.query(sql, function (err, result) {
                    callback(err, result);
                    // 释放连接
                    connection.release();
                });
            });
        }else {

            pool.getConnection(function (err, connection) {
                var sql = "select * from " + dbConfig.tables.useVideo_table  + " where type='" + html.type + "'";
                connection.query(sql, function (err, result) {
                    callback(err, result);
                    // 释放连接
                    connection.release();
                });
            });
        }
    },
    find: function (req, res, callback){
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.useVideo_table ;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    create: function (req, res, callback) {
        var id = UUID.v1();
        id = id.replace(/-/g, '0');
        var video = req.body;
        video.photo = '' + req.files[0].filename;
        video.video = '' + req.files[1].filename;
        video.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
        video.id = id;
        var data = base.formatDbString(video, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.useVideo_table + " SET " + data.queryString;
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
            var sql = "select * from " + dbConfig.tables.useVideo_table + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var video = req.body;
        video.photo = '' + req.file.filename;
        var data = base.formatDbString(video, " ,");
        var id = video.id;
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.useVideo_table + " set " + data.queryString + " where id='" + id + "'";
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
            var sql = "delete from " + dbConfig.tables.useVideo_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};