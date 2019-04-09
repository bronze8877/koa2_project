const Koa = require('koa')
const views = require('koa-views')
const {resolve} = require('path')
const {connect, initSchemas} = require('./database/init')
const mongoose = require('mongoose')
const app = new Koa();
;(async()=>{
    await connect()
    initSchemas()
    const Movie = mongoose.model('Movie')
    const result = await Movie.find({})
    console.log(result)
})()
;
app.use(views(resolve(__dirname,'./views'),{
    extension: 'pug'
}))

app.use(async(ctx,next)=>{
    await ctx.render('index',{
        you: 'luck',
        me: 'scott'
    })
})
app.listen(4455)