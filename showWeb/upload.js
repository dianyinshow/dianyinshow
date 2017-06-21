/**
 * Created by wanhua on 2017/6/9.
 */
/* 上传的中间件 */
var fs = require('fs');
var path = require('path');
module.exports = function (req, res, next){
    var posterData = req.files.uploadPoster;// 海报地址
    var filePath = posterData.path;// 海报路径
    var originalFilename = posterData.originalFilename; // 海报的原始名字
    // 这种方式只能读取写入小文件
    if(originalFilename) {// 如果存在的话
        fs.readFile(filePath, function (err, data){
            var timeStamp = Date.now(); // 时间戳
            var type = posterData.type.split('/')[1];// 文件名
            var poster = timeStamp + '.' + type; // 组合文件
            var newPath = path.join(__dirname, 'public/upload' + poster); // 写入的地址路径

            fs.writeFile(newPath, data, function (err){// 开始写入
                req.poster = poster;
                next();
            });
        });
    }else {
        next();
    }
};