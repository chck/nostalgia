const test = require(`ava`);
const gcs = require(`../../src/lib/gcs`);
const storage = require(`@google-cloud/storage`);
const fs = require(`fs-extra`);
const utils = require(`../../src/lib/utils`);

/*
* ref. https://cloud.google.com/functions/docs/bestpractices/testing
* */

const localPath = `/tmp/nostalgia.png`;

test.before(t => {
  fs.writeFileSync(localPath, `test`)
});

// due to embed gcp credential in travis is difficult.
test.skip(`gcs: should upload image`, async (t) => {
  await gcs.uploadImg(localPath);
  const remotePath = `screenshots/${utils.genArticleName()}.png`;
  const exists = await new storage.Storage({
    projectId: process.env[`GCP_PROJECT`],
  }).bucket(process.env[`GCS_BUCKET`]).file(remotePath).exists();

  t.deepEqual(exists, [true]);

  await new storage.Storage({
    projectId: process.env[`GCP_PROJECT`],
  }).bucket(process.env[`GCS_BUCKET`]).file(remotePath).delete();
});

test.after(t => {
  fs.unlinkSync(localPath);
});
