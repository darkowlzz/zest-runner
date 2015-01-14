'use strict';

var Runtime = require('../runtime'),
    should  = require('should'),
    fs      = require('fs');

var expressionFile = 'testData/expressionData.js';

describe('==== test zest expressions ====', function () {
  var runtime = new Runtime({debug: true});
  var data = fs.readFileSync(expressionFile, 'utf8');
  var expressions = JSON.parse(data);

  runtime.globals.response = {
    statusCode: 100,
    body: 'Zest is an experimental specialized scripting language', //length: 54
    url: 'http://example.com',
    headers: 'HTTP/1.1 200 OK\r\nAccept-Ranges: bytes\r\nCache-Control: max-age\u003d604800\r\nContent-Type: text/html\r',
    responseTimeInMs: 672
  };
  runtime.globals.foo = 'mozilla';

  describe('should evaluate ZestExpressionStatusCode', function () {
    it('should evaluate to true', function () {
      var result = runtime.evalExpression(expressions[0]);
      result.should.be.true;
    });

    it('should evaluate to false', function () {
      var result = runtime.evalExpression(expressions[1]);
      result.should.be.false;
    }); 
  });

  describe('should evaluate ZestExpressionLength', function () {
    it('should evaluate to true under +ve approx', function () {
      var result = runtime.evalExpression(expressions[2]);
      result.should.be.true;
    });

    it('should evaluate to true under -ve approx', function () {
      var result = runtime.evalExpression(expressions[3]);
      result.should.be.true;
    });

    it('should evaluate to false', function () {
      var result = runtime.evalExpression(expressions[4]);
      result.should.be.false;
    });

    it('should evaluate response.url to true', function () {
      var result = runtime.evalExpression(expressions[5]);
      result.should.be.true;
    });

    it('should evaluate response.headers to true', function () {
      var result = runtime.evalExpression(expressions[6]);
      result.should.be.true;
    });

    it('should evaluate common variable name to true', function () {
      var result = runtime.evalExpression(expressions[7]);
      result.should.be.true;
    });
  });

  describe('should evaluate ZestExpressionRegex', function () {
    it('should evaluate to true with case-insensitive regex', function () {
      var result = runtime.evalExpression(expressions[8]);
      result.should.be.true;
    });

    it('should evaluate to false with case-sensitive regex', function () {
      var result = runtime.evalExpression(expressions[9]);
      result.should.be.false;
    });

    it('should evaluate response.body to true', function () {
      var result = runtime.evalExpression(expressions[10]);
      result.should.be.true;
    });
  });
});
