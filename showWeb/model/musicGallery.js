/**
 * Created by wanhua on 2017/6/8.
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
            var sql = "select * from " + dbConfig.tables.musicGallery_table;
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
        music.photo = '/photo/music/' + req.file.filename;
        music.id = id;
        music.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        var data = base.formatDbString(music, " ,");

        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.musicGallery_table + " SET " + data.queryString;
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
            var sql = "select * from " + dbConfig.tables.musicGallery_table + " where id='" + id + "'";
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
        music.photo = '/photo/music/' + req.file.filename;
        var data = base.formatDbString(music, " ,");
        var id = music.id;
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.musicGallery_table + " set " + data.queryString + " where id='" + id + "'";
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
            var sql = "delete from " + dbConfig.tables.musicGallery_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};