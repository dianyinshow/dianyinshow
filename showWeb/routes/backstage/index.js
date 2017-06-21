/**
 * Created by wanhua on 2017/5/27.
 */
var express = require('express');
var router = express.Router();
/* 登录页 */

router.get('/', function (req, res) {
   res.render('backstage/sign/signin', {})
});
module.exports = router;