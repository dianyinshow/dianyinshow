/**
 * Created by huiyu on 2017/6/16.
 */
var express = require('express');  //时间格式化
var moment = require('moment');
var router = express.Router();
var articleModel = require('../../../model/web/communityCon');

// 更新文章点赞总数量
//localhost:3000/website/comshow/conlist/praise
//{"status":1,"userId":"19ac9210054a0011e70bb070db522ccb4188","articleId":"03eec8900517a011e708b2f041cb24c3430e"}
function updatePrasieCount(req,res,status){
    articleModel.findArticleById(req, res, function (err, result) {
        if (!err) {
            if (JSON.stringify(result)!='[]') {
                var praiseCount = parseInt(result[0].praiseCount);
                //console.log(status);
                if(status=="0"){
                    praiseCount--;
                    req.body.praiseCount = praiseCount;

                    articleModel.updateArticlePraiseCount(req, res, function (err, result){
                        if(!err){
                            if (JSON.stringify(result)!='[]') {

                                articleModel.findArticleById(req, res, function (err, result) {
                                    if (!err) {
                                        if (JSON.stringify(result) != '[]') {
                                            var pCount = parseInt(result[0].praiseCount);
                                            console.log(pCount);
                                            console.log("取消赞成功！");
                                            res.send(pCount+"");
                                        }else{
                                            res.send("0");
                                        }
                                    }else{
                                        res.send("0");
                                    }
                                });
                                //res.send(praiseCount+"");
                            }else{
                                res.send("0");
                            }
                        }else{
                            console.log("点赞数量更新失败！");
                            res.send("0");
                        }
                    });
                }else{
                    praiseCount++;
                    req.body.praiseCount = praiseCount;

                    articleModel.updateArticlePraiseCount(req, res, function (err, result){
                        if(!err){
                            if (JSON.stringify(result)!='[]') {
                                console.log("点赞成功！");
                                res.send(praiseCount+"");
                            }else{
                                res.send("0");
                            }
                        }else{
                            console.log("点赞数量更新失败！");
                            res.send("0");
                        }
                    });
                }
            } else {
                res.send("0");
            }
        } else {
            res.send("0");
        }
    });
}

router.get('/', function (req, res, next) {
    //获取文章详情
    var users = req.session.user;
    articleModel.findArticleById(req, res, function (err, result) {
        if (!err) {
            if (result.length) {
                console.log(result[0]);
                res.render('website/index/conlist',{"article":result[0],users: users});
            } else {
                res.redirect('back');
            }
        } else {
            console.log(err);
            res.redirect('back');
        }
    });
});

//status : 1 点赞  0 取消赞
router.post('/praise', function (req, res, next) {
    //查询点赞记录表
    articleModel.getPraiseStatus(req, res, function (err, result){
        if (err) {
            console.log(err);
            res.send({
                code: '0'
            });
        } else {
            if(JSON.stringify(result)!='[]'){
                var status = result[0].status;
                console.log(status);
                if(status=="0"){
                    req.body.status = 1;//如果未点赞则设置成点赞1
                    //console.log(req.body);
                    articleModel.updatePraiseStatus(req, res, function (err, result){
                        if(err){
                            console.log(err);
                            res.send({
                                code: '0'
                            });
                        }else{
                            if(JSON.stringify(result)!='[]'){//点赞成功
                                updatePrasieCount(req,res,req.body.status);
                            }else{
                                res.send({
                                    code: '0'
                                });
                            }
                        }

                    });
                }else{
                    req.body.status = 0;//如果已经点赞则取消点赞
                    //console.log(req.body);
                    articleModel.updatePraiseStatus(req, res, function (err, result){
                        if(err){
                            console.log(err);
                            res.send({
                                code: '0'
                            });
                        }else{
                            if(JSON.stringify(result)!='[]'){//取消赞成功
                                updatePrasieCount(req,res,req.body.status);
                                /*console.log(result);
                                res.send({
                                    code: '1'
                                });*/
                            }else{
                                res.send({
                                    code: '0'
                                });
                            }
                        }

                    });
                }
            }else{//没有查到则插入点赞记录表
                articleModel.insertPraiseStatus(req, res, function (err, result){
                    if(err){
                        console.log(err);
                        res.send({
                            code: '0'
                        });
                    }else{
                        if(JSON.stringify(result)!='[]'){//第一次点赞成功
                            //console.log(result);
                            updatePrasieCount(req,res,req.body.status);

                        }else{
                            res.send({
                                code: '0'
                            });
                        }
                    }

                });
            }

        }
    });
});
module.exports = router;