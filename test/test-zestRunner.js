'use strict';

var ZestRunner = require('../'),
    should     = require('should'),
    objData    = require('../testData/sampleObjDataSet').sampleZest;


var fileWithFail = 'testData/dataSetFail.js',
    fileFull = 'testData/sampleDataSet.js',
    fileShort = 'testData/shortSet.js';
var TIME = 20000;

describe('==== test zest runner ====', function () {
  var opts = {
    sourceType: 'file',
    file: fileWithFail
    ,debug: true
  };
  var zestRunner = new ZestRunner(opts);

  it('script should fail after 4 statements', function (done) {
    this.timeout(TIME);
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
    this.timeout(TIME);
    opts.file = fileFull;
    zestRunner = new ZestRunner(opts);

    zestRunner.run()
    .then(function () {
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

  it('should run script from obj', function (done) {
    this.timeout(TIME);
    var opts2 = {
      sourceType: 'object',
      zest: objData
      ,debug: true
    };
    var zr = new ZestRunner(opts2);
    zr.run()
    .then(function () {
      zr.runtime.globals.should.have.properties({
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

  it('should run one at a time', function (done) {
    this.timeout(TIME);
    opts.file = fileShort;
    zestRunner = new ZestRunner(opts);
    zestRunner.runNext()
    .then(function () {
      return zestRunner.runNext();
    })
    .then(function () {
      console.log(zestRunner.runtime.globals);
      zestRunner.runtime.globals.var1.should.be.exactly('apple');
      return zestRunner.runNext();
    })
    .then(function () {
      zestRunner.count.should.be.exactly(3);
      return zestRunner.runNext();
    })
    .then(function () {
      zestRunner.count.should.be.exactly(3);
      zestRunner.reset();
      zestRunner.count.should.be.exactly(0);
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });
});
