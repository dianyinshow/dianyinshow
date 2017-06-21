/**
 * Created by wanhua on 2017/6/21.
 */
/**
 * Created by wanhua on 2017/6/20.
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
            var sql = "select * from " + dbConfig.tables.template_table;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    findOne: function (req, res, callback, id) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.template_table + " where id='" + id + "'";
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
        var template = req.body;
        template.id = id;
        if (template.nature) {
            template.nature = '审核通过';
        } else {
            template.nature = '审核未通过';
        }
        template.createTime = moment().format('YYYY-MM-DD  HH:mm:ss');
        var data = base.formatDbString(template, " ,");
        console.log(data);
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.template_table + " SET " + data.queryString;
            var val = data.values;
            connection.query(sql, val, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },
    update: function (req, res, callback) {
        var template = req.body;
        if (template.nature) {
            template.nature = '审核通过';
        } else {
            template.nature = '审核未通过';
        }
        var data = base.formatDbString(template, " ,");
        var id = template.id;
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.template_table + " set " + data.queryString + " where id='" + id + "'";
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
            var sql = "delete from " + dbConfig.tables.template_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    }
};