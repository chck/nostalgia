const test = require(`ava`);
const fs = require(`fs-extra`);
const github = require(`../../src/lib/github`);

test(`github: should login`, async (t) => {
  const loggedin = await github.login();
  const page = loggedin.page;
  const element = await page.$(`#account-switcher-left > summary`);
  const actual = await element.$eval('span', (e) => e.innerText);
  const expected = process.env['GITHUB_ID'];
  t.is(actual, expected)
});

test(`github: should fetch progress`, async (t) => {
  const actual = await github.fetchProgress();
  const expected = process.env['SCREENSHOT_PATH'];
  t.is(actual, expected);
  t.true(fs.existsSync(process.env['SCREENSHOT_PATH']));
});

test.after(t => {
  fs.unlinkSync(process.env['SCREENSHOT_PATH']);
});
