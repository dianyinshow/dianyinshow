/**
 * Created by wanhua on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
router.get('/', function (req, res){
    var user = req.session.user;
    res.render('website/show/myNews', {
        user: user[0]
    });
});
module.exports = router;