'use strict';

var ZestCreator = require('zest-creator'),
    Runtime     = require('../runtime'),
    should      = require('should');


describe('test zest runner', function () {
  var zc = new ZestCreator({file: 'testData/sampleDataSet.js',
                            debug: true});
  var runtime = new Runtime();

  it('should run assignString', function () {
    runtime.run(zc.getStatement(2));
    runtime.run(zc.getStatement(3));
    runtime.globals.should.have.properties({
      var1: 'apple',
      var2: 'berry'
    });
  });

  it('should run assignRandomInteger', function () {
    runtime.run(zc.getStatement(4));
    runtime.globals.var3.should.be.a.Number;
  });

  it('should run assignReplace', function () {
    runtime.run(zc.getStatement(5));
    runtime.globals.var1.should.be.exactly('aggle');
  });

  it('should replace with regex', function () {
    runtime.run(zc.getStatement(6));
    runtime.run(zc.getStatement(7));
    runtime.globals.var4.should.be.exactly('oranges are oranges');
  });

  it('should run actionPrint', function () {
    runtime.run(zc.getStatement(10));
    // FIXME: Test it
  });

  it('should run loopString', function () {
    runtime.run(zc.getStatement(8));
    runtime.globals.m.should.be.exactly('4');
    runtime.run(zc.getStatement(9));
    runtime.globals.m.should.be.exactly('8');
  });

  it('should run loopInteger', function () {
    runtime.globals.m.should.be.exactly('8');
    runtime.run(zc.getStatement(13));
    runtime.globals.m.should.be.exactly('18');
  });

  it('should run assignCalc add', function () {
    runtime.run(zc.getStatement(16));
    runtime.globals.z.should.be.exactly('7');
  });
});
