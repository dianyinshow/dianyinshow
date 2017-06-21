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
        var b = dbConfig.tables.communityCon_table;
        var html = req.query;
        if(true) {
            pool.getConnection(function (err, connection) {
                var sql = "select * from " + b ;
                connection.query(sql, function (err, result) {
                    callback(err, result);
                    // 释放连接
                    connection.release();
                });
            });
        }else {
            pool.getConnection(function (err, connection) {
                var sql = "select * from " + b  + " where type='" + html.type + "'";
                connection.query(sql, function (err, result) {
                    callback(err, result);
                    // 释放连接
                    connection.release();
                });
            });
        }

    },
    create: function (req, res, callback, cid) {
        var id = UUID.v1();
        id = id.replace(/-/g, '0');
        var story = req.body;
        var result ={};
        result.type  = story.type;
        result.id = id;
        result.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        var data = base.formatDbString(result, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.community_table + " SET " + data.queryString;
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result, id);
                // 释放连接
                connection.release();
            });
        });
    },
    findOne: function (req, res, callback, id) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.community_table + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var music = req.body;
        if(music.charge) {
            music.charge = '收费';
        }else {
            music.charge = '不收费';
        }
        if(music.nature) {
            music.nature = '审核通过';
        }else {
            music.nature = '审核未通过';
        }
        music.photo = '' + req.file.filename;
        var data = base.formatDbString(music, " ,");
        var id = music.id;
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.community_table + " set " + data.queryString + " where id='" + id + "'";
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
            var sql = "delete from " + dbConfig.tables.community_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};
