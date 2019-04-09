var qiniu = require("qiniu");
var config = require('../config')

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.qiniu.AK;
qiniu.conf.SECRET_KEY = config.qiniu.SK;

//要上传的空间
var bucket = "test0408";

//var resUrl = 'http://test-m-stg.guguangbing.online.qiniudns.com';
var key = 'poster-test.jpg'

var resUrl = "https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2552430417.jpg";

var mac = new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);

bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
    if (err) {
        console.log(err);
        //throw err;
    } else {
        if (respInfo.statusCode == 200) {
            console.log(respBody.key);
            console.log(respBody.hash);
            console.log(respBody.fsize);
            console.log(respBody.mimeType);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    }
});

