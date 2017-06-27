/**
 * Created by wanhua on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
var Message = require('../../../model/message');
router.get('/', function (req, res){
    Message.findAll(req, res, function (err, value){
        if(err) {
            console.log(err);
        }else {
            if(value.length) {
                res.render('website/show/my-goods', {
                    user: req.session.user[0],
                    value: value
                });
            }else {
                res.render('website/show/my-goods', {
                    user: req.session.user[0],
                    value: []
                });
            }
        }
    });

});
module.exports = router;