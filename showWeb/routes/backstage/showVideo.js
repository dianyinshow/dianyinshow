/**
 * Created by wanhua on 2017/6/12.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var upload = multer({dest: 'public/photo/show'});

module.exports = router;