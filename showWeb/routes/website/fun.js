/**
 * Created by wanhua on 2017/6/15.
 */
var express = require('express');
var router = express.Router();
var UseVideo = require('../../model/backstage_useVideo');
router.get('/type', function (req, res) {
    var pageSize = 6;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    UseVideo.findAll(req, res, function (err, results){
        if (err) {
            console.log(err);
        } else {
            if (results.length) {
                var result = results.slice(index, index + pageSize);
                res.send({
                    code: '1',
                    result: result,
                    currentPage: pageNum,
                    totalPage: Math.ceil(results.length / pageSize)
                });
            } else {
                res.send({
                    code: '0'
                })
            }
        }
    })
});

module.exports = router;

