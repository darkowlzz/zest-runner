var main = require("../"),
    ZestCreator = require('../zest/node_modules/zest-creator/zestCreator'),
    sampleZest = require('./sampleData').sampleZest,
    ZestRunner = require('../zest/zestRunner');

//var zc = new ZestCreator({debug: true}, sampleZest);
var zr = new ZestRunner({platform: 'firefox',
                         sourceType: 'object',
                         zest: sampleZest});
//var runtime = new Runtime({debug: true, platform: 'firefox'});

exports["test A - run in runner"] = function (assert, done) {
  zr.run()
  .then(function (r) {
    console.log('RUN completed');
    console.log(JSON.stringify(r, null, 2));
    console.log('length:', r.length);
    assert.equal(r[0].print, 'hi a', 'Is the print right');
    assert.equal(r[1].print, 'yo', 'Is the print right');
    assert.equal(r[2].print, 'hi b', 'Is the print right');
    assert.equal(r[18].result, true, 'Is the result true');
    assert.equal(r[19].result, false, 'Is the result false');
    assert.equal(r[36].print, 'Attacking with 9', 'Is the print right');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

require("sdk/test").run(exports);
