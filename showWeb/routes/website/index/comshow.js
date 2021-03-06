/**
 * Created by huiyu on 2017/6/16.
 */
var express = require('express');
var router = express.Router();
var Community = require('../../../model/backstage_community');
var articleModel = require('../../../model/web/communityCon');
router.get('/', function (req, res) {
    var pageSize = 8;
    var pageNum = req.query.pageNum || 1;
    var index = (pageNum - 1) * pageSize;
    var users = req.session.user;
    articleModel.findAllArticles(req, res, function (err, results){
        if (err) {
            console.log(err);
        } else {
            //console.log(results);
            if (results.length) {
                var totalPage = Math.ceil(results.length/pageSize);
                var result = results.slice(index, index + pageSize);
                console.log(result);
                //console.log(totalPage);
                //console.log(result[0].id);
                res.render('website/index/comshow',{
                    code:"1",
                    title:'首页的标题',
                    articles:result,
                    pageNum:pageNum,
                    pageSize:pageSize,
                    totalPage:totalPage,
                    users: users
                });
            } else {
                res.send({
                    code: '0'
                })
            }
        }
    })
});
router.get('/type', function (req, res){
    var pageSize = 8;
    var pageNum = req.query.pageNum || 1;
    var index = (pageNum - 1) * pageSize;
    var users = req.session.user;
    articleModel.findArticleByType(req, res, function (err, results){
        if (err) {
            console.log(err);
        } else {
            if (results.length) {
                var totalPage = Math.ceil(results.length/pageSize);
                var result = results.slice(index, index + pageSize);
                console.log(result);
                res.render('website/index/comshow',{
                    code:"1",
                    title:'首页的标题',
                    articles:result,
                    pageNum:pageNum,
                    pageSize:pageSize,
                    totalPage:totalPage,
                    users: users
                });
            } else {
                res.render('website/index/comshow',{
                    code:"1",
                    title:'首页的标题',
                    articles: [],
                    pageNum:pageNum,
                    pageSize:pageSize,
                    totalPage: 0,
                    users: users
                });
            }
        }
    })
});


module.exports = router;