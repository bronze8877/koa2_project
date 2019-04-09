let url = 'mongodb://ggb:ggb12345678@111.231.85.152:27017/test'
let mongoose = require('mongoose')
let glob = require('glob')
let resolve = require('path').resolve
let db = mongoose.connection;
mongoose.Promise = global.Promise;
exports.connect = () =>{
    let maxConnectTimes = 0;
    return new Promise((resolve,reject)=>{

        if(process.ENV === 'development') {
            mongoose.set('debug', true)
        }
        mongoose.connect(url, {useNewUrlParser: true});
        db.on('disconnected', function() {
            maxConnectTimes++
            if(maxConnectTimes< 5) {
                mongoose.connect(url, {useNewUrlParser: true});
            }else {
                throw new Error('数据库挂了')
            }
            console.log('successed connection')
        });
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('successed connection')
            resolve();
        });
    })
}

exports.initSchemas = ()=>{
  glob.sync(resolve(__dirname, './scheme','**/*.js')).forEach(require)
}
