var main = require("../"),
    Runtime = require('../zest/runtime'),
    ZestCreator = require('../zest/node_modules/zest-creator/zestCreator'),
    sampleZest = require('./sampleData').sampleZest;


var zc = new ZestCreator({debug: true}, sampleZest);
var runtime = new Runtime({debug: true, platform: 'firefox'});
runtime.setDefinition('tokenStart', '{{');
runtime.setDefinition('tokenEnd', '}}');

exports["test A1 - comment and var assignment"] = function(assert, done) {
  runtime.run(zc.getStatement(1))
  .then(function () {
    return runtime.run(zc.getStatement(2));
  })
  .then(function () {
    return runtime.run(zc.getStatement(3));
  })
  .then(function () {
    assert.ok(runtime.globals.var1 === 'apple');
    assert.ok(runtime.globals.var2 === 'berry');
    done();
  })
  .catch(function (err) {
    done(err);
  });
};

exports["test A2 - random int assign"] = function (assert, done) {
  runtime.run(zc.getStatement(4))
  .then(function () {
    assert.ok(typeof(Number(runtime.globals.var3)) === 'number');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test A3 - assign replace"] = function (assert, done) {
  runtime.run(zc.getStatement(5))
  .then(function () {
    assert.ok(runtime.globals.var1 === 'aggle');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test A4 - assign replace multiple"] = function (assert, done) {
  runtime.run(zc.getStatement(6))
  .then(function () {
    return runtime.run(zc.getStatement(7));
  })
  .then(function () {
    assert.ok(runtime.globals.var4 === 'oranges are oranges');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test A5 - loop string"] = function (assert, done) {
  runtime.run(zc.getStatement(8))
  .then(function () {
    assert.ok(runtime.globals.m === '4');
    return runtime.run(zc.getStatement(9));
  })
  .then(function () {
    assert.ok(runtime.globals.m === '8');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test A6 - loop integer"] = function (assert, done) {
  runtime.run(zc.getStatement(13))
  .then(function () {
    assert.ok(runtime.globals.m === '18');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test A7 - action sleep"] = function (assert, done) {
  runtime.run(zc.getStatement(20))
  .then(function () {
    assert.pass("Sleep done");
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test A8 - conditional"] = function (assert, done) {
  runtime.run(zc.getStatement(21))
  .then(function () {
    assert.ok(runtime.globals.varX === '4');
    return runtime.run(zc.getStatement(22));
  })
  .then(function () {
    assert.ok(runtime.globals.varX === '5');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test A9 - request"] = function (assert, done) {
  runtime.run(zc.getStatement(27))
  .then(function () {
    assert.ok(runtime.globals.requestResult === true);
    return runtime.run(zc.getStatement(28));
  })
  .then(function () {
    assert.ok(runtime.globals.requestResult === false);
    return runtime.run(zc.getStatement(29));
  })
  .then(function () {
    assert.ok(runtime.globals.requestResult === true);
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test B1 - print substitution"] = function (assert, done) {
  runtime.run(zc.getStatement(30))
  .then(function (r) {
    assert.ok(r.print === 'url was http://example.com/');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test B2 - append cookies-headers"] = function (assert, done) {
  runtime.run(zc.getStatement(31))
  .then(function () {
    assert.ok(runtime.globals.requestResult === true);
    var hdrs = runtime.globals.request.headers;
    assert.ok(hdrs['content-type'] === 'application/x-www-form-urlencoded');
    assert.ok(hdrs['set-cookie'][0] === 'username=foo; Path=/');
    assert.ok(hdrs['set-cookie'][1] === 'remember=never; Path=/');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test B3 - loop regex"] = function (assert, done) {
  runtime.run(zc.getStatement(32))
  .then(function () {
    assert.ok(runtime.globals.loopRegexVal === '5');
    return runtime.run(zc.getStatement(33));
  })
  .then(function () {
    assert.ok(runtime.globals.loopRegexVal === '9');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

exports["test B4 - loop file"] = function (assert, done) {
  runtime.run(zc.getStatement(36))
  .then(function (r) {
    assert.ok(r[0][0].print === 'Attacking with 0');
    assert.ok(r[1][0].print === 'Attacking with 1');
    assert.ok(r[2][0].print === 'Attacking with 2');
    assert.ok(r[3][0].print === 'Attacking with 3');
    assert.ok(r[4][0].print === 'Attacking with 4');
    assert.ok(r[5][0].print === 'Attacking with 5');
    assert.ok(r[6][0].print === 'Attacking with 6');
    assert.ok(r[7][0].print === 'Attacking with 7');
    assert.ok(r[8][0].print === 'Attacking with 8');
    assert.ok(r[9][0].print === 'Attacking with 9');
    assert.ok(r[0][0].type === 'ZestActionPrint');
    done();
  })
  .catch(function (err) {
    done(err);
  });
}

require("sdk/test").run(exports);
