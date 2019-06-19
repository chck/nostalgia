const storage = require(`@google-cloud/storage`);
const fs = require(`fs-extra`);
const utils = require(`./utils`);

const uploadImg = async (localPath) => {
  const remotePath = `screenshots/${utils.genArticleName()}.png`;
  const bucket = process.env[`GCS_BUCKET`];
  const remoteFile = new storage.Storage({
    projectId: process.env['GCP_PROJECT'],
  }).bucket(bucket).file(remotePath);

  return new Promise((resolve, reject) => {
    fs.createReadStream(localPath).pipe(remoteFile.createWriteStream({
      metadata: {contentType: `image/png`},
    }))
      .on("error", reject)
      .on("finish", () => {
        remoteFile.makePublic().then((x) => {
          resolve(`https://storage.googleapis.com/${bucket}/${remotePath}`)
        })
      });
  })
};

const removeImg = async (remotePath) => {
  return await new storage.Storage({
    projectId: process.env[`GCP_PROJECT`],
  }).bucket(process.env[`GCS_BUCKET`]).file(remotePath).delete();
};

module.exports = {
  uploadImg,
  removeImg,
};
