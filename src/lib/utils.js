const moment = require(`moment`);

const genArticleName = () => {
  const today = moment().format("YYYY-MM-DD");
  return `Progress-${today}`;
};

module.exports = {
  genArticleName,
};
