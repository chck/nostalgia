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
  const submit_button = await page.$(`input[type="submit"]`);
  await submit_button.click();
  await page.waitFor(3000);
  return page
};

module.exports = {
  login,
};
