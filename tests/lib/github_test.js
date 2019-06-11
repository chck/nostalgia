const test = require(`ava`);

const github = require(`../../src/lib/github`);

test(`github: should login`, async (t) => {
  const page = await github.login();
  const element = await page.$(`#account-switcher-left > summary`);
  const actual = await element.$eval('span', (e) => e.innerText);
  const expected = process.env['GITHUB_ID'];
  t.is(actual, expected)
});
