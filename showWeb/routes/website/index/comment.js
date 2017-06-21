/**
 * Created by huiyu on 2017/6/20.
 */

var express = require('express');
var router = express.Router();
//var conListModel = require('../../../model/web/communityCon');
var commentModel = require('../../../model/web/comment');

router.post('/', function (req, res) {
    //插入评论
    commentModel.insertComment(req, res, function (err, result){
        if (err) {
            res.send({
                code: '0'
            });

        } else {
            console.log(result);
            //console.log(totalPage);
            //console.log(result[0].id);
            res.send({
                code: '1'
            });
        }
    })
});

//通过文章id查询评论
router.get('/', function (req, res) {
    //插入评论
    commentModel.getCommentByArticleId(req, res, function (err, result){
        if (err) {
            res.send({
                code: '0'
            });
            console.log(err);
        } else {
            console.log(result);
            //console.log(totalPage);
            //console.log(result[0].id);
            res.send({
                code: '1'
            });
        }
    })
});

module.exports = router;