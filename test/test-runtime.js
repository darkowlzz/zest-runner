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
});
