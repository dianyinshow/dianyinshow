/**
 * Created by wanhua on 2017/5/27.
 */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res){
    res.render('backstage/layout/manage', {
        title: '前端板块管理'
    });
});
module.exports = router;