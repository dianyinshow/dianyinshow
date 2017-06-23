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
    create: function (req, res, callback){
        var id = UUID.v1();
        id = id.replace(/-/g, '0');
        var message = req.body;
        console.log(message);
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
    }
};