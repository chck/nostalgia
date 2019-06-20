const test = require(`ava`);
const fs = require(`fs-extra`);
const gcs = require(`../../src/lib/gcs`);
const utils = require(`../../src/lib/utils`);
const esa = require(`../../src/lib/esa`);

let imgUrl = ``;

test.before(async (t) => {
  const localPath = `/tmp/nostalgia.png`;
  fs.writeFileSync(localPath, `test`);
  imgUrl = await gcs.uploadImg(localPath);
  fs.unlinkSync(localPath);
});

test(`esa: should post progress`, async (t) => {
  const created = await esa.postProgress(imgUrl, `This post is test via ava.`);
  t.true(created.status === 201);
  const deleted = await esa.deleteArticle(created.data.number);
  t.true(deleted.status === 204);
});

test.after(async (t) => {
  const remotePath = `screenshots/${utils.genArticleName()}.png`;
  await gcs.removeImg(remotePath);
});
