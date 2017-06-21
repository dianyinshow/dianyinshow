/**
 * Created by huiyu on 2017/6/19.
 */
var mysql = require('mysql');
var dbConfig = require("../../config/database");
var moment = require('moment');
var uuid = require('uuid');

var articleTable = dbConfig.tables.communityCon_table;
//ʹ�����ӳ�
var pool = mysql.createPool(dbConfig.showMysql);
module.exports = {
    //ͨ��id��ȡ��������
    findArticleById: function (req, res, callback) {
        var id  = req.query.id || req.body.articleId;
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.communityCon_table+" where id='"+id+"'";
            console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // �ͷ�����
                connection.release();
            });
        });
    },

    findAllArticles: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + articleTable ;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // �ͷ�����
                connection.release();
            });
        });
    },

    findArticleByType: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + articleTable+" where type="+req.body.type;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // �ͷ�����
                connection.release();
            });
        });
    },

    findAllConlist: function (req, res, callback) {
        var conId = req.query.id;
        pool.getConnection(function (err, connection) {
            var userInfo = req.body;//��ȡurl�е�id����
            var sql = "SELECT * FROM communitycon,USER WHERE communitycon.id='03eec8900517a011e708b2f041cb24c3430e' AND communitycon.`userId` = user.`id`";
            //console.log(sql);
            connection.query(sql, function (err, result) {
                callback(err, result);
                // �ͷ�����
                connection.release();
            });
        });
    },

    //��¼����״̬
    insertPraiseStatus: function (req, res, callback) {
        //��ȡ���ύ������
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
                // �ͷ�����
                connection.release();
            });
        });
    },

    //���µ���״̬
    updatePraiseStatus: function (req, res, callback) {
        //��ȡ���ύ������
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
                // �ͷ�����
                connection.release();
            });
        });
    },

    //��ѯ����״̬
    getPraiseStatus: function (req, res, callback) {
        //��ȡ���ύ������
        var praiseInfo = req.body;
        /*praiseInfo.userId = "113";
        praiseInfo.articleId = "223";*/
        //console.log(praiseInfo);

        pool.getConnection(function (err, connection) {
            var sql = "select status from " + dbConfig.tables.webPraise_table + " where userId='"+praiseInfo.userId+"' and articleId='"+praiseInfo.articleId+"'";
            connection.query(sql, praiseInfo, function (err, result) {
                //console.log(sql);
                callback(err, result);
                // �ͷ�����
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
                // �ͷ�����
                connection.release();
            });
        });
    },

    findAll: function (req, res, callback) {
        pool.getConnection(function (err, connection) {
            var sql = "select * from " + dbConfig.tables.communityCon_table;
            connection.query(sql, function (err, result) {
                callback(err, result);
                // �ͷ�����
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
                // �ͷ�����
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
                // �ͷ�����
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
                // �ͷ�����
                connection.release();
            });
        });
    },

    delete: function (req, res, callback, id){
        pool.getConnection(function (err, connection) {
            var sql = "delete from " + dbConfig.tables.communityCon_table + " where id='" + id + "'";
            connection.query(sql,  function (err, result) {
                callback(err, result);
                // �ͷ�����
                connection.release();
            });
        });
    }
};