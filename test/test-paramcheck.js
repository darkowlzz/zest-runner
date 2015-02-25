'use strict';

var ZestRunner = require('../'),
    should     = require('should'),
    objData    = require('../testData/gistfile1').sampleZest;


describe('==== test zest params ====', function () {
  var opts = {
    sourceType: 'object',
    zest: objData,
    debug: true
  };
  var zr = new ZestRunner(opts);

  it('should catch undefined tokens error', function () {
    try {
      zr.run();
    }
    catch (e) {
      e.should.startWith('ERROR: Undefined tokens');
    }
  });

  it('parameter token should be present in runtime', function (done) {
    zr.script.parameters.tokens['request.body'] = 'humpty dumpty';
    zr.script.parameters.tokens['request.url'] = 'http://humpty.com';
    zr.script.parameters.tokens['request.method'] = 'this is content of the body';
    zr.run()
    .then(function (r) {
      var vars = zr.runtime.globals;
      vars.request.body.should.be.exactly('humpty dumpty');
      vars.target.should.be.exactly('__replace__');
      vars.request.url.should.be.exactly('http://humpty.com');
      vars.request.method.should.be.exactly('this is content of the body');
      console.log(r);
      r[0].should.have.properties({
        print: 'token request.url http://humpty.com',
        type: 'ZestActionPrint'
      });
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });
});
