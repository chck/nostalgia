const test = require(`ava`);
const sinon = require(`sinon`);
const esa = require(`../src/lib/esa`);

const nostalgia = require(`../src`).nostalgia;

const rArticleUrl = `https://${process.env[`ESA_TEAM_ID`]}.esa.io/posts/\\d+`;
let createdArticleUrl = ``;

test(`nostalgia: should share your progress.`, async (t) => {
  const req = {
    body: {
      githubProjectUrl: `https://github.com/chck/nostalgia/projects/1`
    }
  };
  const res = {send: sinon.stub()};

  await nostalgia(req, res);

  t.true(res.send.calledOnce);
  createdArticleUrl = res.send.firstCall.args[0];
  t.true(new RegExp(rArticleUrl).test(createdArticleUrl));
});

test.after(async (t) => {
  const matched = createdArticleUrl.match(rArticleUrl);
  const createdArticleNumber = matched[1];
  await esa.deleteArticle(createdArticleNumber);
});
