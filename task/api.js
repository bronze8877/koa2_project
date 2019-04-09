// http://api.douban.com/v2/movie/subject/1764796
const rp = require('request-promise-native')
async function fetchMovie (item) {
    const url = `http://api.douban.com/v2/movie/${item.doubanId}`
    console.log(url)
    let res = await rp(url)

    try {
        res = JSON.parse(res)
    } catch (err) {
        console.log(err)
        res = null
    }

    return res
}

console.log(fetchMovie({doubanId:'27202985'}).then(res=>{
    console.log(res)
}))
