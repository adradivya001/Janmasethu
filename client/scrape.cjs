const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const searchFor = async (query) => {
        await page.goto(`https://lordicon.com/icons/search?query=${query}&type=free&style=regular-system`, { waitUntil: 'networkidle2' });
        try {
            await page.waitForSelector('a[href^="/icons/system/regular/"]', { timeout: 5000 });
            const href = await page.$eval('a[href^="/icons/system/regular/"]', el => el.href);
            await page.goto(href, { waitUntil: 'networkidle2' });
            await page.waitForSelector('lord-icon', { timeout: 5000 });
            const src = await page.$eval('lord-icon', el => el.getAttribute('src'));
            console.log(`${query}: ${src}`);
            return src;
        } catch (e) {
            console.log(`${query}: not found`);
            return null;
        }
    };

    const queries = ['medical', 'stethescope', 'book', 'chat', 'trophy', 'home', 'document', 'nutrition', 'apple', 'success'];
    for (const q of queries) {
        await searchFor(q);
    }

    await browser.close();
})();
