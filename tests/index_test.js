const test = require(`ava`);
const sinon = require(`sinon`);

const nostalgia = require(`../src`).nostalgia;

test.skip(`nostalgia: should print screenshot's path`, async (t) => {
  const expected = process.env['SCREENSHOT_PATH'];
  const name = 'nostalgia';
  const req = {
    body: {
      name: name
    }
  };
  const res = {send: sinon.stub()};

  await nostalgia(req, res);

  t.true(res.send.calledOnce);
  t.deepEqual(res.send.firstCall.args, [expected]);
});
