/**
 * Created by wanhua on 2017/6/22.
 */
var mysql = require('mysql');
var dbConfig = require("../../config/database");
//使用连接池
var pool = mysql.createPool(dbConfig.showMysql);
//使用uuid
connectionsArray = [];
exports.pollingLoop = function () {
    // 查询数据库
    pool.getConnection(function (err, connection){
        var query = connection.query('SELECT * FROM message_table');
        var message = []; // 用于保存查询结果
        var delay = 10;
        var pollingTimer;
        // 查询结果监听
        query
            .on('error', function (err) {
                // 查询出错处理
                console.log(err);
                updateSockets(err);
            })
            .on('result', function (user) {
                // 加入查询到的结果到articles数组
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
        var updateSockets = function(data) {
            // 加上最新的更新时间
            data.time = new Date();
            // 推送最新的更新信息到所以连接到服务器的客户端
            connectionsArray.forEach(function(tmpSocket) {
                tmpSocket.volatile.emit('notification', data);
            });
        };
    });

};