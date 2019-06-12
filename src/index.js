const github = require(`./lib/github`);


/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.nostalgia = async (req, res) => {
  const screenshotPath = await github.fetchProgress();
  res.send(screenshotPath);
};
