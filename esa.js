const request = require('superagent');
const moment = require('moment');
const config = require('./config');

function genArticleName() {
  const today = moment().format('YYYY-MM-DD');
  return `Progress-${today}`;
}

async function post(params = {}) {
  request
    .post(`https://api.esa.io/v1/teams/${config.esaTeamId}/posts`)
    .send({post: params})
    .set('Authorization', `Bearer ${config.esaAccessToken}`)
    .end((err, res) => {
      if (err) {
        console.log(res.body);
        throw new Error(res.body.message);
      } else {
        return res.body;
      }
    });
}

async function postProgress(imgUrl) {
  const body_md = [
    `![${imgUrl}](${imgUrl})[^1]`,
    '[^1]: この記事は[nostalgia](https://github.com/chck/nostalgia)によって自動投稿されました',
  ].join('\n');

  await post({
    name: genArticleName(),
    body_md: body_md,
    category: config.esaCategory,
  });
}


module.exports = {
  postProgress,
  genArticleName,
};

