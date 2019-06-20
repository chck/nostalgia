const test = require(`ava`);
const fs = require(`fs-extra`);
const github = require(`../../src/lib/github`);

// due to pass github login verification is difficult.
test.skip(`github: should login`, async (t) => {
  const loggedin = await github.login();
  const page = loggedin.page;
  const element = await page.$(`#account-switcher-left > summary`);
  const actual = await element.$eval('span', (e) => e.innerText);
  const expected = process.env['GITHUB_ID'];
  t.is(actual, expected)
});

test(`github: should fetch progress`, async (t) => {
  const actual = await github.fetchProgress();
  const expected = github.screenshotPath;
  t.is(actual, expected);
  t.true(fs.existsSync(github.screenshotPath));
});

test.after(t => {
  fs.unlinkSync(github.screenshotPath);
});
