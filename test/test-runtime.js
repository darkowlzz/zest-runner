'use strict';

var ZestCreator = require('zest-creator'),
    Runtime     = require('../runtime'),
    should      = require('should');


describe('test zest runner', function () {
  var zc = new ZestCreator({file: 'testData/sampleDataSet.js',
                            debug: true});
  var runtime = new Runtime();

  it('should run assignString', function (done) {
    this.timeout(9000);
    runtime.run(zc.getStatement(2))
    .then(function () {
      return runtime.run(zc.getStatement(3));
    })
    .then(function () {
      runtime.globals.should.have.properties({
        var1: 'apple',
        var2: 'berry'
      });
      done();
    });
  });

  it('should run assignRandomInteger', function (done) {
    this.timeout(9000);
    runtime.run(zc.getStatement(4))
    .then(function () {
      runtime.globals.var3.should.be.a.Number;
      done();
    });
  });

  it('should run assignReplace', function (done) {
    this.timeout(9000);
    runtime.run(zc.getStatement(5))
    .then(function () {
      runtime.globals.var1.should.be.exactly('aggle');
      done();
    });
  });

  it('should replace with regex', function (done) {
    this.timeout(9000);
    runtime.run(zc.getStatement(6))
    .then(function () {
      return runtime.run(zc.getStatement(7));
    })
    .then(function () {
      runtime.globals.var4.should.be.exactly('oranges are oranges');
      done();
    })
  });

  it('should run actionPrint', function (done) {
    this.timeout(9000);
    runtime.run(zc.getStatement(10))
    .then(function () {
      done();
    });
    // FIXME: Test it
  });

  it('should run loopString', function (done) {
    this.timeout(10000);
    runtime.run(zc.getStatement(8))
    .then(function () {
      runtime.globals.m.should.be.exactly('4');
      return runtime.run(zc.getStatement(9));
    })
    .then(function (r) {
      runtime.globals.m.should.be.exactly('8');
      done();
    })
  });

  it('should run loopInteger', function (done) {
    this.timeout(9000);
    runtime.globals.m.should.be.exactly('8');
    runtime.run(zc.getStatement(13))
    .then(function () {
      runtime.globals.m.should.be.exactly('18');
      done();
    });
  });

  describe('should run assignCalc', function () {
    it('should add', function (done) {
      this.timeout(9000);
      runtime.run(zc.getStatement(16))
      .then(function () {
        runtime.globals.z.should.be.exactly('7');
        done();
      });
    });

    it('should subtract', function (done) {
      this.timeout(9000);
      runtime.run(zc.getStatement(17))
      .then(function () {
        runtime.globals.z.should.be.exactly('0');
        done();
      });
    });

    it('should multiply', function (done) {
      this.timeout(9000);
      runtime.run(zc.getStatement(18))
      .then(function () {
        runtime.globals.z.should.be.exactly('12');
        done();
      });
    });

    it('should divide', function (done) {
      this.timeout(9000);
      runtime.run(zc.getStatement(19))
      .then(function () {
        runtime.globals.z.should.be.exactly('2');
        done();
      });
    });
  });

  it('should run actionSleep', function (done) {
    this.timeout(1000);
    runtime.run(zc.getStatement(20))
    .then(function (r) {
      done();
    })
  });
});
