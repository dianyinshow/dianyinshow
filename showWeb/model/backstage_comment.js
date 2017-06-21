/**
 * Created by wanhua on 2017/6/2.
 */
var mongoose = require('mongoose');
var db = require('../db');
mongoose.Promise = Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(db.dbUrl);
var commentSchema = new mongoose.Schema({
    articalId: {
        type: ObjectId,
        ref: 'cmmunityCon'
    },
    userFrom: {
        type: ObjectId,
        ref: 'sers'
    },
    content: String,
    reply: {
        userFrom: ObjectId,
        userTo: ObjectId,
        content: String
    },
    createTime: Date,
    updateTime: Date
}, {collection: 'comment'});
var comment = mongoose.model('comment', commentSchema);
exports.comment = comment;
