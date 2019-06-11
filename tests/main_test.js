const test = require(`ava`);
const sinon = require(`sinon`);

const nostalgia = require(`../src/main`).nostalgia;

test(`nostalgia: should print name`, t => {
  const name = 'nostalgia';
  const req = {
    body: {
      name: name
    }
  };
  const res = {send: sinon.stub()};

  nostalgia(req, res);

  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [`Hello ${name}!`]);
});
