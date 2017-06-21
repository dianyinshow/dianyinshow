/**
 * Created by wanhua on 2017/6/11.
 */
var express = require('express');
var router = express.Router();
var Community = require('../../model/backstage_community');
router.get('/type', function (req, res) {
    var pageSize = 8;
    var pageNum = req.query.pageNum;
    var index = (pageNum - 1) * pageSize;
    Community.findAll(req, res, function (err, results){
        if (err) {
            console.log(err);
        } else {
            console.log(results);
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
