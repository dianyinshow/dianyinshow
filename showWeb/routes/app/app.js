var express = require('express');
var router = express.Router();
var moment = require('moment');
var mysql = require('mysql');
var pool = require("../../config/database").showMysql;
//引入用户总表
var usersSchema = require("../../config/database").tables.user;
//引入app用户表
var usersSchema = require("../../config/database").tables.appUser

//app注册 获取电话号码 
router.post('/userInfo', function (req, res){
   var user = req.body; 
   user.username = '请设置昵称';
   user.avatarApp = '/app/image/selfimg.png';
   if(user) {
   		pool.getConnection(function(err, connection) {
			  // Use the connection
			  connection.query( 'SELECT * FROM user', function(err, rows) {
			    // And done with the connection.
			    // 释放连接
			    console.log(rows);
			    connection.release();
			
			    // Don't use the connection here, it has been returned to the pool.
			  });
			});  
   }else {
   		console.log('error');
   }
});



/*
//
var usersSchema = require('../../model/users').users;

var appUserSchema = require('../../model/appUser').appUser;
//引入直播类型表
var liveTypeSchema = require('../../model/liveType').liveType;
//引入直播表
var liveSchema = require('../../model/live').live;


//获取注册密码
router.post('/userPassword',function(req,res) {
	var userInfo = req.body;
	usersSchema.findOne({'mobile':userInfo.mobile},function(err,doc) {
		if(err) {
			console.log(err);
		}else {
			var id = doc._id;
			if(doc) {
				usersSchema.update({'mobile':userInfo.mobile},{'password':userInfo.password},
				function(err,doc) {
					if(err) {
						console.log(err);
					}else {
						res.send('11');//操作成功，返回11
					}
				});
				appUserSchema.create({'userId':id,'mobile':userInfo.mobile},function(err,doc) {
					if(err) {
						console.log(err);
					}else{
						console.log(11)
					}
				})
			}else {
				res.send('用户不存在')
			}
		}
	})
})


//登录
router.post('/getUserInfo',function(req,res) {
	var userInfo = req.body;
	if(userInfo) {
		usersSchema.findOne({'mobile':userInfo.mobile,'password':userInfo.password},function(err,doc) {
			if(!err) {
				
				if(doc) {
					res.send('11');
				}else {
					res.send('22');
				}
				
			}else{
				console.log(err);
			}
		})
	}else {
		console.log('wrong');
	}
	
})


//获取用户信息
router.get('/getUserInfo',function(req,res) {
	var userInfo = req.query;
	console.log(userInfo)
	appUserSchema.findOne(userInfo)
	.populate('userId')
	.exec(function(err,doc){
		if(err) {
			console.log(err);
		}else {
			console.log(doc)
			res.send(doc);
		}
	})
})

//修改用户头像和名称信息
router.post('/updateUserName',function(req,res) {
	var userInfo = req.body;
	console.log(userInfo)
	if(userInfo) {
		var userName = userInfo.username;
		var mobile = userInfo.mobile;
		appUserSchema.findOne({'mobile':mobile})
		.populate('userId')
		.exec(function(err,doc) {
			if(err) {
				console.log(err);
			}else {
				var id = doc.userId._id;
				console.log(id);
				usersSchema.update({"_id":id},{"username":userName},function(err,doc) {
					if(err) {
						console.log(err);
					}else {
						res.send(userName);
					}
				})
			}
		})
	}else {
		console.log('wrong');
	}
})


//获取直播类型
router.get('/getLiveType',function(req,res) {
//	var type = {};
//	var arr = [
//		{'type':'点映试映','chooise':'点映会，试映会'},
//		{'type':'首映/见面会','chooise':'点映会，试映会'},
//		{'type':'路演直播','chooise':'点映会，试映会'},
//	]
//	for(var i=0;i<arr.length;i++) {
//		type.type = arr[i].type;
//		type.chooise = arr[i].chooise;
//		liveTypeSchema.create(type,function(err,doc) {
//			if(err) {
//				console.log(err);
//			}else {
//				console.log(doc);
//			}
//		})
//	}
	liveTypeSchema.find({},function(err,doc) {
		if(err) {
			console.log(err);
		}else {
			res.send(doc);
		}
	})
})


//开始直播
router.post('/startLive',function(req,res) {
	var userInfo = req.body;
	if(userInfo) {
		usersSchema.findOne({'mobile':userInfo.mobile},function(err,doc) {
			if(err) {
				console.log(err);
			}else {
				if(doc) {
					var id = doc._id;
					var mobile = doc.mobile;
					var liveType = userInfo.liveType;
					var time = moment().format('YYYY-MM-DD HH:mm:ss'); 
					liveSchema.create({'mobile':mobile,
										'userId':id,
										'liveType':liveType,
										'startDate':time,
										'streamName':mobile
										},function(err,doc) {
											if(err) {
												console.log(err);
											}else {
												liveSchema.findOne({'startDate':time},function(err,doc) {
													if(err) {
														console.log(err);
													}else {
														var newId = doc._id;
														res.send({'code':'11','id':newId});
													}
												})
											}
										})
				}else {
					console.log('wrong');
				}
			}
		})
	}
})
//开始直播添加直播信息
router.post('/addLiveInfo',function(req,res) {
	var info = req.body;
	var streamName = info.streamName;
	var pushUrl = info.pushUrl;
	var playUrl = info.pushUrl;
	var id = info.id;
	liveSchema.findOne({"_id":id},function(err,doc) {
		if(err) {
			console.log(err);
		} else {
			console.log(doc)
			if(doc) {
				var userId = doc.userId;
				liveSchema.update({"_id":id},
									{$set:{"pushUrl":pushUrl,
									"playUrl":playUrl,
									"streamName":streamName}},
									function(err,doc) {
										if(err) {
											console.log(err);
										}else {
											usersSchema.findOne({"_id":userId},function(err,doc) {
												if(err) {
													console.log(err);
												}else {
													if(doc) {
														console.log(doc)
														res.send(doc);
													}
												}
											})
										}
									})
			}
		}
	})
})*/




module.exports = router;