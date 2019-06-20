const axios = require(`axios`);
const utils = require(`./utils`);

const endpoint = `https://api.esa.io/v1/teams/${process.env['ESA_TEAM_ID']}/posts`;
const accessToken = process.env['ESA_ACCESS_TOKEN'];

const postProgress = async (imgUrl, footer) => {
  const bodyMd = [
    `![${imgUrl}](${imgUrl})[^1]`,
    `[^1]: ${footer}`,
  ].join('\n');

  return await postArticle({
    name: utils.genArticleName(),
    body_md: bodyMd,
    category: process.env['ESA_CATEGORY'],
    wip: false,
  })
};

const postArticle = async (data) => {
  return await axios.post(`${endpoint}?access_token=${accessToken}`, {
    post: data,
  })
};

const deleteArticle = async (postNumber) => {
  return await axios.delete(`${endpoint}/${postNumber}?access_token=${accessToken}`)
};

module.exports = {
  postProgress,
  deleteArticle,
};
