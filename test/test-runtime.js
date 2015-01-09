'use strict';

var ZestCreator = require('zest-creator'),
    runtime     = require('../runtime'),
    should      = require('should');


describe('test zest runner', function () {
  var zc = new ZestCreator({file: 'testData/sampleDataSet.js'});

  it('should run assignString', function () {
    runtime.run(zc.getStatement(2));
    runtime.run(zc.getStatement(3));
    runtime.varList().should.have.properties({
      var1: 'apple',
      var2: 'berry'
    });
  });

  it('should run assignRandomInteger', function () {
    runtime.run(zc.getStatement(4));
    runtime.varList().var3.should.be.a.Number;
  });

  it('should run assignReplace', function () {
    runtime.run(zc.getStatement(5));
    runtime.varList().var1.should.be.exactly('aggle');
  });

  it('should replace with regex', function () {
    runtime.run(zc.getStatement(6));
    runtime.run(zc.getStatement(7));
    runtime.varList().var4.should.be.exactly('oranges are oranges');
  });

  it('should run actionPrint', function () {
    runtime.run(zc.getStatement(10)).should.be.exactly('yo');
  });

  it('should run loopString', function () {
    runtime.run(zc.getStatement(8));
    // FIXME: Create a way to test it.
  })
});
