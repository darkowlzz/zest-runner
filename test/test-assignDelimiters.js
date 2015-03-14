'use strict';

var ZestRunner = require('../'),
    should     = require('should');

var TIME = 20000;


// Test for issue #42
describe('==== test ZestAssignString/RegexDelimiters', function () {
  var opts = {
    sourceType: 'file',
    file: 'testData/assignDelimiters.zst',
    debug: true
  };
  var zestRunner = new ZestRunner(opts);

  it('Assign with Delimiters should return correct values', function (done) {
    this.timeout(TIME);
    zestRunner.run()
    .then(function (r) {
      console.log(r);
      r[2].print.should.be.exactly('meta: ="viewport" content="width=device-width, initial-scale=1" ');
      r[3].print.should.be.exactly('meta: ="viewport" content="width=device-width, initial-scale=1" ');
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });
});
