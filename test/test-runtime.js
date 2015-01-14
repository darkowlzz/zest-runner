'use strict';

var ZestCreator = require('zest-creator'),
    Runtime     = require('../runtime'),
    should      = require('should');

var TIME = 9000;

describe('==== test zest runtime ====', function () {
  var zc = new ZestCreator({file: 'testData/sampleDataSet.js',
                            debug: true});
  var runtime = new Runtime({debug: true});

  it('should run assignString', function (done) {
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

  it('should run assignRandomInteger', function (done) {
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

  it('should run assignReplace', function (done) {
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

  it('should replace with regex', function (done) {
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

  it('should run actionPrint', function (done) {
    this.timeout(TIME);
    runtime.run(zc.getStatement(11))
    .then(function (message) {
      message.should.be.exactly('yo');
      done();
    })
    .catch(function (err) {
      done(err);
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
    .catch(function (err) {
      done(err);
    });
  });

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

  describe('should run assignCalc', function () {
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

  describe('should run conditionals', function () {
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

  it('should run actionFail', function (done) {
    this.timeout(TIME);
    runtime.run(zc.getStatement(26))
    .then(function (r) {
      r[0].should.be.exactly('fail');
      r[1].should.be.exactly('boom! berry');
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });

  /*
  it('should run request', function (done) {
    this.timeout(15000);
    runtime.run(zc.getStatement(27))
    .then(function () {
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });
  */
});
