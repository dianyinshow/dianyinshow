/**
 * Created by huiyu on 2017/6/19.
 */
var mysql = require('mysql');
var dbConfig = require("../../config/database");
var moment = require('moment');
var uuid = require('uuid');

var articleTable = dbConfig.tables.communityCon_table;
//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
module.exports = {
    //通过id获取文章详情
    findArticleById: function (req, res, callback) {
        var id  = req.query.id || req.body.articleId;
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.communityCon_table+" where id='"+id+"'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    findAllArticles: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + articleTable ;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    findArticleByType: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + articleTable+" where type="+req.body.type;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    findAllConlist: function (req, res, callback) {
        var conId = req.query.id;
        pool.getConnection(function (err, connection) {
            var userInfo = req.body;//获取url中的id参数
            var sql = "SELECT * FROM communitycon,USER WHERE communitycon.id='03eec8900517a011e708b2f041cb24c3430e' AND communitycon.`userId` = user.`id`";
            //console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //记录点赞状态
    insertPraiseStatus: function (req, res, callback) {
        //获取表单提交的内容
        var praiseInfo = req.body;
        /*praiseInfo.createTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        praiseInfo.updateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        praiseInfo.id = uuid.v1().replace(/\-/g,'0');
        praiseInfo.userId = "113";
        praiseInfo.articleId = "223";
        praiseInfo.status = "1";*/
        console.log(praiseInfo);
        pool.getConnection(function (err, connection) {
            var sql = "INSERT INTO " + dbConfig.tables.webPraise_table + " SET ?";
            connection.query(sql, praiseInfo, function (err, result) {
                //console.log(sql);
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //更新点赞状态
    updatePraiseStatus: function (req, res, callback) {
        //获取表单提交的内容
        var praiseInfo = req.body;
        /*praiseInfo.status = 0;
        praiseInfo.userId = "113";
        praiseInfo.articleId = "223";*/
        console.log(praiseInfo);
        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.webPraise_table + " SET status=? where userId=? and articleId=?";
            var praise = [praiseInfo.status,praiseInfo.userId,praiseInfo.articleId];
            connection.query(sql, praise, function (err, result) {
                //console.log(sql);
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    //查询点赞状态
    getPraiseStatus: function (req, res, callback) {
        //获取表单提交的内容
        var praiseInfo = req.body;
        /*praiseInfo.userId = "113";
        praiseInfo.articleId = "223";*/
        //console.log(praiseInfo);

        pool.getConnection(function (err, connection) {
            var sql = "select status from " + dbConfig.tables.webPraise_table + " where userId='"+praiseInfo.userId+"' and articleId='"+praiseInfo.articleId+"'";
            connection.query(sql, praiseInfo, function (err, result) {
                //console.log(sql);
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

    updateArticlePraiseCount: function (req, res, callback) {
        var praiseCount = req.body.praiseCount;
        var id = req.body.articleId;

        pool.getConnection(function (err, connection) {
            var sql = "update " + dbConfig.tables.communityCon_table + " set praiseCount=" + praiseCount + " where id='" + id + "'";
            connection.query(sql, function (err, result) {
                callback(err, result);
                // 释放连接
                connection.release();
            });
        });
    },

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
        story.typeId = typeId;
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
        // var id = req.session.user.id;
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