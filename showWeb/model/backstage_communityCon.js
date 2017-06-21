/**
 * Created by wanhua on 2017/6/2.
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
            var sql = "select * from " + dbConfig.tables.communityCon_table;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    create: function (req, res, callback, typeId) {
        var id = UUID.v1();
        id = id.replace(/-/g, '0');
        var story = req.body;
        story.photo = '' + req.file.filename;
        story.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
        story.id = id;
        story.typeId = typeId
        var data = base.formatDbString(story, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.communityCon_table + " SET " + data.queryString;
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
            var sql = "select * from " + dbConfig.tables.communityCon_table + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var story = req.body;
        story.photo = '' + req.file.filename;
        var data = base.formatDbString(story, " ,");
        var id = story.id;
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.communityCon_table + " set " + data.queryString + " where id='" + id + "'";
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
            var sql = "delete from " + dbConfig.tables.communityCon_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};