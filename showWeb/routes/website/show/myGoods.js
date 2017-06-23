/**
 * Created by wanhua on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res){
    res.render('website/show/my-goods');
});
module.exports = router;