const github = require(`./lib/github`);
const gcs = require(`./lib/gcs`);
const esa = require(`./lib/esa`);
const escapeHtml = require(`escape-html`);

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.nostalgia = async (req, res) => {
  const githubProjectUrl = escapeHtml(req.body.githubProjectUrl);
  const screenshotPath = await github.fetchProgress(githubProjectUrl);
  const imgUrl = await gcs.uploadImg(screenshotPath);
  const created = await esa.postProgress(imgUrl);
  res.send(created.data.url);
};
