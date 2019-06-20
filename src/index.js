const github = require(`./lib/github`);
const gcs = require(`./lib/gcs`);
const esa = require(`./lib/esa`);

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.nostalgia = async (req, res) => {
  // TODO: error handling to not guess req.body.githuubProjectUrl
  const githubProjectUrl = JSON.parse(req.body.toString()).githubProjectUrl;
  const screenshotPath = await github.fetchProgress(githubProjectUrl);
  const imgUrl = await gcs.uploadImg(screenshotPath);
  const created = await esa.postProgress(imgUrl);
  res.send(created.data.url);
};
