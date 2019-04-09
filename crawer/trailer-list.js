const puppeteer = require('puppeteer');
const url= 'https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=2019'
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})
;(async () => {

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false});
    const page = await browser.newPage();
    await page.goto(url,{
        waitUntil: 'networkidle2'
        });
    await page.waitForSelector('.more')
    for (let i = 0; i < 2; i++) {
      await sleep(3000)
      await page.click('.more')
    }
    const result = await page.evaluate(() => {
        var $ = window.$
        var items = $('.list-wp a')
        var links = []
        console.log(items.length)
        if (items.length >= 1) {
            items.each((index, item) => {
                console.log(item)
                let it = $(item)
                let doubanId = it.find('.cover-wp').data("id");
                let title = $(it.find('p .title')).text().trim();
                let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

                links.push({
                    doubanId,
                    title,
                    poster
                })
            })
        }
        return links
    })

    await browser.close();
    process.send({result})
    process.exit(0)
})();