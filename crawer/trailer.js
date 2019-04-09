const puppeteer = require('puppeteer')

const base = 'https://movie.douban.com/subject/'
const trailerBase = 'https://movie.douban.com/trailer/'

const sleep = (time) => new Promise(resolve => {
        setTimeout(resolve, time)
    })

// https://github.com/GoogleChrome/puppeteer/issues/290
;(async () => {
    console.log('开始访问目标页面')
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()

    let doubanId = '27202985'

    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    })
    await sleep(1000)

    const result = await page.evaluate(() => {
        var $ = window.$
        var it = $('.related-pic-video')
        var link = it.attr('href')
        return {
            link
        }
    })

    let video

    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })
        await sleep(1000)

        video = await page.evaluate(() => {
            var $ = window.$
            var it = $('source').attr('src')
            return it
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }

    await browser.close()
    process.send(data)
    process.exit(0)
})()