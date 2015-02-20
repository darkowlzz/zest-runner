var main = require("../"),
    ZestCreator = require('../zest/node_modules/zest-creator/zestCreator'),
    sampleZest = require('./sampleData').sampleZest,
    ZestRunner = require('../zest/zestRunner');

var zc = new ZestCreator({debug: true}, sampleZest);
var zr = new ZestRunner({platform: 'firefox',
                         sourceType: 'object',
                         zest: zc});
//var runtime = new Runtime({debug: true, platform: 'firefox'});

exports["test A - run in runner"] = function (assert, done) {
  zr.runNext()
  .then(function () {
    return zr.runNext();
  })
  .then(function () {
    console.log('RUN completed');
    assert.ok(true);
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

require("sdk/test").run(exports);
