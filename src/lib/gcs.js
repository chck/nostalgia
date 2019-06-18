const storage = require(`@google-cloud/storage`);
const fs = require(`fs-extra`);
const utils = require(`./utils`);

const uploadImg = async (localPath) => {
  const remotePath = `screenshots/${utils.genArticleName()}.png`;
  const bucket= process.env[`GCS_BUCKET`];
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

module.exports = {
  uploadImg,
};
