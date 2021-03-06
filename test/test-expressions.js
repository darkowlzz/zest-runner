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
    responseTimeInMs: 3672
  };
  runtime.globals.foo = 'mozilla';
  runtime.globals.aVar = 'Regular expressions are patterns used to match...';
  runtime.globals.aNum = '5';

  describe('should evaluate ZestExpressionStatusCode', function () {
    it('should evaluate to true', function () {
      var result = runtime.evalExpression(expressions[0]);
      result.result.should.be.true;
    });

    it('should evaluate to false', function () {
      var result = runtime.evalExpression(expressions[1]);
      result.result.should.be.false;
    }); 

    it('should evaluate to true due to inverse', function () {
      var result = runtime.evalExpression(expressions[2]);
      result.result.should.be.true;
    });
  });

  describe('should evaluate ZestExpressionLength', function () {
    it('should evaluate to true under +ve approx', function () {
      var result = runtime.evalExpression(expressions[3]);
      result.result.should.be.true;
    });

    it('should evaluate to true under -ve approx', function () {
      var result = runtime.evalExpression(expressions[4]);
      result.result.should.be.true;
    });

    it('should evaluate to false', function () {
      var result = runtime.evalExpression(expressions[5]);
      result.result.should.be.false;
    });

    it('should evaluate response.url to true', function () {
      var result = runtime.evalExpression(expressions[6]);
      result.result.should.be.true;
    });

    it('should evaluate response.headers to true', function () {
      var result = runtime.evalExpression(expressions[7]);
      result.result.should.be.true;
    });

    it('should evaluate common variable name to true', function () {
      var result = runtime.evalExpression(expressions[8]);
      result.result.should.be.true;
    });

    it('should evaluate to false due to inverse', function () {
      var result = runtime.evalExpression(expressions[9]);
      result.result.should.be.false;
    })
  });

  describe('should evaluate ZestExpressionRegex', function () {
    it('should evaluate to true with case-insensitive regex', function () {
      var result = runtime.evalExpression(expressions[10]);
      result.result.should.be.true;
    });

    it('should evaluate to false with case-sensitive regex', function () {
      var result = runtime.evalExpression(expressions[11]);
      result.result.should.be.false;
    });

    it('should evaluate response.body to true', function () {
      var result = runtime.evalExpression(expressions[12]);
      result.result.should.be.true;
    });

    it('should evaluate common variable name to true', function () {
      var result = runtime.evalExpression(expressions[13]);
      result.result.should.be.true;
    });

    it('should evaluate to false due to inverse', function () {
      var result = runtime.evalExpression(expressions[14]);
      result.result.should.be.false;
    })
  });

  describe('should evaluate ZestExpressionURL', function () {
    it('should evaluate to true for includeRegexes only', function () {
      var result = runtime.evalExpression(expressions[15]);
      result.result.should.be.true;
    });

    it('should evaluate to false for common include and exclude', function () {
      var result = runtime.evalExpression(expressions[16]);
      result.result.should.be.false;
    });

    it('should evaluate to false for excludeRegexes only', function () {
      var result = runtime.evalExpression(expressions[17]);
      result.result.should.be.false;
    });

    it('should evaluate to false for no include and exclude', function () {
      var result = runtime.evalExpression(expressions[18]);
      result.result.should.be.false;
    });

    it('should evaluate to true due to inverse', function () {
      var result = runtime.evalExpression(expressions[19]);
      result.result.should.be.true;
    });
  });

  describe('should evaluate ZestExpressionEquals', function () {
    it('should evaluate to true for response.url', function () {
      var result = runtime.evalExpression(expressions[20]);
      result.result.should.be.true;
    });

    it('should evaluate to false for response.url', function () {
      var result = runtime.evalExpression(expressions[21]);
      result.result.should.be.false;
    });

    it('should evaluate to false due to unmatched case', function () {
      var result = runtime.evalExpression(expressions[22]);
      result.result.should.be.false;
    });

    it('should evaluate to true due to inverse', function () {
      var result = runtime.evalExpression(expressions[23]);
      result.result.should.be.true;
    });
  });

  describe('should evaluate ZestExpressionResponseTime', function () {
    it('should evaluate to true with greaterThan', function () {
      var result = runtime.evalExpression(expressions[24]);
      result.result.should.be.true;
    });

    it('should evaluate to false without greaterThan', function () {
      var result = runtime.evalExpression(expressions[25]);
      result.result.should.be.false;
    });

    it('should evaluate to true without greaterThan', function () {
      var result = runtime.evalExpression(expressions[26]);
      result.result.should.be.true;
    });

    it('should evaluate to false due to inverse', function () {
      var result = runtime.evalExpression(expressions[27]);
      result.result.should.be.false;
    });
  });

  describe('should evaluate ZestExpressionIsInteger', function () {
    it('should evaluate to true with an integer', function () {
      var result = runtime.evalExpression(expressions[28]);
      result.result.should.be.true;
    });

    it('should evaluate to false with a string', function () {
      var result = runtime.evalExpression(expressions[29]);
      result.result.should.be.false;
    });

    it('should evaluate to true with inverse', function () {
      var result = runtime.evalExpression(expressions[30]);
      result.result.should.be.true;
    });
  });
});
