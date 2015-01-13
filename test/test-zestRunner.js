'use strict';

var ZestRunner = require('../'),
    should     = require('should');


describe('==== test zest runner ====', function () {
  var opts = {
    sourceType: 'file',
    file: 'testData/sampleDataSet.js'
    ,debug: true
  };
  var zestRunner = new ZestRunner(opts);
  it('should run the script', function (done) {
    this.timeout(2000);
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
  });
});
