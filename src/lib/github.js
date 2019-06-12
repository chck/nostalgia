const puppeteer = require(`puppeteer`);

const login = async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  page.setViewport({
    width: Number(process.env['VIEWPORT_WIDTH']),
    height: Number(process.env['VIEWPORT_HEIGHT']),
  });

  await page.goto(`https://github.com/login`);
  await page.waitForSelector(`#login_field`);
  await page.type(`#login_field`, process.env['GITHUB_ID']);
  await page.type(`#password`, process.env['GITHUB_PW']);
  const submitButton = await page.$(`input[type="submit"]`);
  await submitButton.click();
  await page.waitFor(3000);
  return {
    page: page,
    browser: browser,
  }
};

const fetchProgress = async () => {
  const loggedin = await login();
  const page = loggedin.page;
  const screenshotPath = process.env['SCREENSHOT_PATH'];
  await page.goto(process.env['GITHUB_PROJECT_URL']);
  await page.waitFor(3000);
  await page.screenshot({
    path: screenshotPath,
    clip: {
      x: Number(process.env['CLIP_X']),
      y: Number(process.env['CLIP_Y']),
      width: Number(process.env['CLIP_WIDTH']),
      height: Number(process.env['CLIP_HEIGHT']),
    },
  });
  await loggedin.browser.close();
  return screenshotPath;
};

module.exports = {
  login,
  fetchProgress,
};
