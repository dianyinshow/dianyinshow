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
            var sql = "select * from " + dbConfig.tables.photoGallery_table;
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
        var photo = req.body;
        if (photo.charge) {
            photo.charge = '收费';
        } else {
            photo.charge = '不收费';
        }
        if (photo.nature) {
            photo.nature = '审核通过';
        } else {
            photo.nature = '审核未通过';
        }
        photo.photo = req.file.filename;
        photo.id = id;
        photo.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        var data = base.formatDbString(photo, " ,");
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.photoGallery_table + " SET " + data.queryString;
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
            var sql = "select * from " + dbConfig.tables.photoGallery_table + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var photo = req.body;
        if (photo.charge) {
            photo.charge = '收费';
        } else {
            photo.charge = '不收费';
        }
        if (photo.nature) {
            photo.nature = '审核通过';
        } else {
            photo.nature = '审核未通过';
        }
        photo.photo = '' + req.file.filename;
        var data = base.formatDbString(photo, " ,");
        var id = photo.id;
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.photoGallery_table + " set " + data.queryString + " where id='" + id + "'";
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
            var sql = "delete from " + dbConfig.tables.photoGallery_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};