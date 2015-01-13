'use strict';

var ZestRunner = require('../'),
    should     = require('should');


var fileWithFail = 'testData/dataSetFail.js';
var fileFull = 'testData/sampleDataSet.js';

describe('==== test zest runner ====', function () {
  var opts = {
    sourceType: 'file',
    file: fileWithFail
    ,debug: true
  };
  var zestRunner = new ZestRunner(opts);
  it('script should fail after 4 statements', function (done) {
    this.timeout(2000);
    zestRunner.run()
    .then(function () {
      zestRunner.count.should.be.exactly(3);
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });

  it('should run the whole script', function (done) {
    this.timeout(2000);
    opts.file = fileFull;
    zestRunner = new ZestRunner(opts);

    zestRunner.run()
    .then(function (r) {
      zestRunner.runtime.globals.should.have.properties({
        var1: 'aggle',
        var2: 'berry',
        var4: 'oranges are oranges',
        m: '18',
        z: '2'
      });
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });
});
