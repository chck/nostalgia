const puppeteer = require('puppeteer');
const config = require('./config');

async function login(page) {
  await page.goto('https://github.com/login');
  await page.waitForSelector('#login_field');
  await page.type('#login_field', config.githubId);
  await page.type('#password', config.githubPw);
  const button = await page.$('input[type="submit"]');
  await button.click();
  await page.waitFor(3000);
}

async function fetchProgress() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: config.viewportWidth, height: config.viewportHeight});
  await login(page);
  await page.goto(config.githubProjectUrl);
  await page.waitFor(3000);
  await page.screenshot({
    path: config.screenshotPath,
    clip: {
      'x': config.clipX,
      'y': config.clipY,
      'width': config.clipWidth,
      'height': config.clipHeight,
    },
  });
  await browser.close();
}


module.exports = {
  fetchProgress,
};