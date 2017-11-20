const Storage = require('@google-cloud/storage');
const fs = require('fs-extra');
const esa = require('./esa');
const config = require('./config');

async function uploadImg(localPath) {
  const gcsname = `${config.githubId}/${esa.genArticleName()}.png`;
  const remoteFile = Storage({
    projectId: config.gcpProjectId,
  }).bucket(config.gcsBucket).file(gcsname);

  return new Promise((resolve, reject) => {
    fs.createReadStream(localPath)
      .pipe(remoteFile.createWriteStream({
        metadata: {contentType: 'image/png'}
      }))
      .on('error', reject)
      .on('finish', () => {
        remoteFile.makePublic().then(() => {
          const url = `https://storage.googleapis.com/${config.gcsBucket}/${gcsname}`;
          resolve(url);
        });
      });
  });
}


// (async () => {
//   const x = await uploadImg('progress.png');
//   console.log(x);
// })();

module.exports = {
  uploadImg,
};

