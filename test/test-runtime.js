'use strict';

var ZestCreator = require('zest-creator'),
    Runtime     = require('../runtime'),
    should      = require('should');

var TIME = 9000;

describe('==== test zest runtime ====', function () {
  var zc = new ZestCreator({file: 'testData/sampleDataSet.js',
                            debug: true});
  var runtime = new Runtime({debug: true});
  runtime.setDefinition('tokenStart', '{{');
  runtime.setDefinition('tokenEnd', '}}');

  describe('run assign statements', function () {
    it('assignString', function (done) {
      this.timeout(TIME);
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
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('assignRandomInteger', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(4))
      .then(function () {
        runtime.globals.var3.should.be.a.String;
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('assignReplace', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(5))
      .then(function () {
        runtime.globals.var1.should.be.exactly('aggle');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('replace with regex', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(6))
      .then(function () {
        return runtime.run(zc.getStatement(7));
      })
      .then(function () {
        runtime.globals.var4.should.be.exactly('oranges are oranges');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run action statements', function () {
    it('actionPrint', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(11))
      .then(function (r) {
        r.print.should.be.exactly('yo');
        done();
      })
      .catch(function (err) {
        done(err);
      });
      // FIXME: Test it
    });

    it('actionFail', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(26))
      .then(function (r) {
        r.print.should.be.exactly('boom! berry');
        r.priority.should.be.exactly('HIGH');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should run actionSleep', function (done) {
      this.timeout(1000);
      runtime.run(zc.getStatement(20))
      .then(function (r) {
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run loopsString', function () {
    it('should run loopString', function (done) {
      this.timeout(10000);
      runtime.run(zc.getStatement(8))
      .then(function () {
        runtime.globals.m.should.be.exactly('4');
        return runtime.run(zc.getStatement(9));
      })
      .then(function (r) {
        r.forEach(function (ele) {
          ele[0].print.should.be.a.String;
          ele[1].print.should.be.exactly('yo');
        });
        runtime.globals.m.should.be.exactly('8');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run loopInteger', function () {
    it('should run loopInteger', function (done) {
      this.timeout(TIME);
      runtime.globals.m.should.be.exactly('8');
      runtime.run(zc.getStatement(13))
      .then(function () {
        runtime.globals.m.should.be.exactly('18');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });


  describe('run assignCalc', function () {
    it('should add', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(16))
      .then(function () {
        runtime.globals.z.should.be.exactly('7');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should subtract', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(17))
      .then(function () {
        runtime.globals.z.should.be.exactly('0');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should multiply', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(18))
      .then(function () {
        runtime.globals.z.should.be.exactly('12');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should divide', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(19))
      .then(function () {
        runtime.globals.z.should.be.exactly('2');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });


  describe('run conditionals', function () {
    it('should run conditional if block', function (done) {
      this.timeout(1000);
      runtime.run(zc.getStatement(21))
      .then(function (r) {
        return runtime.run(zc.getStatement(22));
      })
      .then(function () {
        runtime.globals.varX.should.be.exactly('5');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should run conditional else block', function (done) {
      this.timeout(3000);
      runtime.run(zc.getStatement(22))
      .then(function (r) {
        runtime.globals.varX.should.be.exactly('4');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('should run requests', function () {
    it('should pass for correct statusCode', function (done) {
      this.timeout(15000);
      runtime.run(zc.getStatement(27))
      .then(function (r) {
        r.result.should.be.true;
        r.method.should.be.exactly('GET');
        r.url.should.be.exactly('http://example.com/');
        r.code.should.be.exactly(200);
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should fail for incorrect statusCode', function (done) {
      this.timeout(15000);
      runtime.run(zc.getStatement(28))
      .then(function (r) {
        console.log(r);
        r.result.should.be.false;
        r.message.should.be.exactly('FAILED Assert - Status Code: expected 201 got 200');
        r.method.should.be.exactly('GET');
        r.url.should.be.exactly('http://example.com/');
        r.code.should.be.exactly(200);
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should pass with method testing', function (done) {
      this.timeout(15000);
      runtime.run(zc.getStatement(29))
      .then(function (r) {
        console.log(r);
        r.result.should.be.true;
        r.method.should.be.exactly('GET');
        r.url.should.be.exactly('http://example.com/');
        r.code.should.be.exactly(200);
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should print result from previous request', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(30))
      .then(function (r) {
        r.print.should.be.exactly('url was http://example.com/');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should pass with body testing and extra cookies', function (done) {
      this.timeout(15000);
      runtime.run(zc.getStatement(31))
      .then(function (r) {
        console.log(r);
        r.result.should.be.true;
        r.method.should.be.exactly('GET');
        r.url.should.be.exactly('http://example.com/');
        r.code.should.be.exactly(200);
        runtime.globals.request.should.have.properties({
          url: 'http://example.com/',
          body: '',
          method: 'GET'
        });
        runtime.globals.request.headers.should.have.properties({
          'content-type': 'application/x-www-form-urlencoded',
          'set-cookie': [ 'username=foo; Path=/', 'remember=never; Path=/' ]
        });
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run loopRegex', function () {
    it('should run loopRegex', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(32))
      .then(function () {
        runtime.globals.loopRegexVal.should.be.exactly('5');
        return runtime.run(zc.getStatement(33));
      })
      .then(function () {
        runtime.globals.loopRegexVal.should.be.exactly('9');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run AssignFieldValue', function () {
    it('should run AssignFieldValue', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(36))
      .then(function () {
        return runtime.run(zc.getStatement(37));
      })
      .then(function () {
        runtime.globals.sss.should.be.exactly('mail');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run AssignStringDelimiters', function () {
    it('should run AssignStringDelimiters on HEAD', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(38))
      .then(function () {
        runtime.globals.ww.should.be.exactly('/1.1 200 ');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should run AssignStringDelimiters on BODY', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(39))
      .then(function () {
        runtime.globals.qq.should.be.exactly('>\n<html lang="');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run AssignRegexDelimiters', function () {
    it('should run AssignRegexDelimiters on HEAD', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(40))
      .then(function () {
        runtime.globals.ww.should.be.exactly('/1.1 200 ');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should run AssignRegexDelimiters on BODY', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(41))
      .then(function () {
        runtime.globals.qq.should.be.exactly('>\n<html lang="');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  describe('run LoopFile', function () {
    it('should run LoopFile', function (done) {
      this.timeout(TIME);
      runtime.run(zc.getStatement(42))
      .then(function (r) {
        r[0][0].print.should.be.exactly('Attacking with 0');
        r[1][0].print.should.be.exactly('Attacking with 1');
        r[2][0].print.should.be.exactly('Attacking with 2');
        r[3][0].print.should.be.exactly('Attacking with 3');
        r[4][0].print.should.be.exactly('Attacking with 4');
        r[5][0].print.should.be.exactly('Attacking with 5');
        r[6][0].print.should.be.exactly('Attacking with 6');
        r[7][0].print.should.be.exactly('Attacking with 7');
        r[8][0].print.should.be.exactly('Attacking with 8');
        r[9][0].print.should.be.exactly('Attacking with 9');
        r[0][0].type.should.be.exactly('ZestActionPrint');
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });
  });
});
