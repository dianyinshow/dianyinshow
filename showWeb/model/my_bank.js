/**
 * Created by wanhua on 2017/6/20.
 */
var mysql = require('mysql');
var dbConfig = require("../config/database");
var  UUID = require('uuid');
var moment = require('moment');
//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);

module.exports = {
    findOne: function (req, res, callback, id) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.my_bank_table + " where bankId='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

};
