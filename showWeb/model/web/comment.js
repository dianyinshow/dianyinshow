/**
 * Created by huiyu on 2017/6/20.
 */
var mysql = require('mysql');
var dbConfig = require("../../config/database");
var moment = require('moment');
var uuid = require('uuid');

//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
module.exports = {
    //用户发表评论
    insertComment: function (req, res, callback) {

        //获取表单提交的内容
        var commentInfo = req.body;
        commentInfo.createTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        //commentInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        commentInfo.id = uuid.v1().replace(/\-/g, '0');

        commentInfo.articleId = "312";
        commentInfo.userId = "235";
        commentInfo.comcontent = "13131";

        console.log(commentInfo);

        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.comment_table + " SET ?";
            console.log(sql);
            connection.query(sql, commentInfo, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //通过文章id获取评论
    getCommentByArticleId:function (req, res, callback) {

        var commentInfo = {};
        commentInfo.articleId = "312";

        console.log(commentInfo);

        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.comment_table + " where articleId='"+commentInfo.articleId+"'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

}