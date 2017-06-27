/**
 * Created by wanhua on 2017/6/22.
 */
var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var mysql = require('mysql');
var dbConfig = require("../../../config/database");

//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
//使用uuid
var connectionsArray = [];
var delay = 10;
var pollingTimer;
router.get('/', function (req, res) {
    fs.readFile('views/website/show/client.html', function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            return res.end('加载客户端首页发生错误...');
        }
        res.writeHead(200);
        res.end(data);
    });
});
var listen = function (httpServer){
    var io = require('socket.io')(httpServer);
    io.on('connection', function (socket) {
        console.log('当前连接客户端数量:' + connectionsArray.length);
        // 有客户端连接的时候才去查询，不然都是浪费资源

        if (connectionsArray.length == 0) {
            pollingLoop();
        }
        socket.on('disconnect', function () {
            var socketIndex = connectionsArray.indexOf(socket);
            if (socketIndex >= 0) {
                connectionsArray.splice(socketIndex, 1);
            }
        });
        console.log('有新的客户端连接!');
        connectionsArray.push(socket);

    });
};

var pollingLoop = function () {
    pool.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM ' + dbConfig.tables.message_table);
        var message = []; // 用于保存查询结果
        // 查询结果监听
        query
            .on('error', function (err) {
                console.log(err);
                updateSockets(err);
            })
            .on('result', function (user) {

                message.push(user);
            })
            .on('end', function () {
                // 检查是否有客户端连接，有连接就继续查询数据库

                if (connectionsArray.length) {
                    pollingTimer = setTimeout(pollingLoop, delay);
                    updateSockets({
                        message: message
                    });
                }
            });
        connection.release();
    });
};

var updateSockets = function (data) {
    // 加上最新的更新时间
    data.time = new Date();
    // 推送最新的更新信息到所以连接到服务器的客户端
    connectionsArray.forEach(function (socket) {
        socket.emit('allMessage', data);
    });
};

module.exports = {
    router: router,
    listen: listen
};