'use strict';

module.exports = Runtime;

var _             = require('lodash'),
    rand          = require('random-seed').create(),
    utils         = require('./utils'),
    simpleHeaders = require('simple-headers'),
    LoopNext      = require('loopnext');

var Q, defer, formInput, request, _setTimeout;
var NODE = 'node',
    FX   = 'firefox';

/**
 * Zest Runtime.
 * @param {Object} opts - Contains optional config values.
 */
function Runtime (opts) {
  opts = opts || {};

  // Set default configuration variables.
  this.config = _.defaults(opts, {
    debug: false,
    platform: NODE
  });

  try {
    if (_.isEqual(this.config.platform, NODE)) {
      defer = require('q').defer;
      formInput = require('form-input-list').formInput;
      request = require('request');
    }
    else if (_.isEqual(this.config.platform, FX)) {
      defer = require('sdk/core/promise').defer;
      request = require('sdk/request').Request;
      _setTimeout = require('sdk/timers').setTimeout;
    }
  } catch (e) {}

  // Create an empty global scope for the runtime.
  this.globals = {};
}


Runtime.prototype = {

  /**
   * Define global variables.
   * @param {String} name - Name of the global variable.
   * @param {String} value - Value of the global variable.
   */
  setDefinition: function (name, value) {
    var that = this;
    if (name.indexOf('.') > -1) {
      var parts = name.split('.');
      var currentVar = that.globals;
      parts.forEach(function (part) {
        if (_.last(parts) === part) {
          currentVar[part] = value;
        } else {
          if (_.isUndefined(currentVar[part])) {
            currentVar[part] = {};
          }
          currentVar = currentVar[part];
        }
      });
    } else {
      this.globals[name] = value;
    }
  },

  // Print debug statements
  log: function (message, args) {
    if (this.config.debug) {
      console.log('DEBUG: ', message, args);
    }
  },

  /**
   * Find variables in message string, replace them with values and return
   * the new message.
   * @param {String} msg - A message string with variables in it.
   * @return {String} - A message string with substituted values for variables.
   */
  _findAndReplace: function (msg) {
    var that = this,
        globals = that.globals;

    var message = msg.replace(/({{\w+\.*\w*}})/g,
      function (matchWord) {
        var variables = matchWord.match(/(\w+\.*\w*)/g);
        return that._getValue(variables[0]);
      }
    );
    return message;
  },

  /**
   * Get value of a given form field.
   * @param {Object} stmt - Statement which contains the field definition.
   * @return {Promise}
   *    Returns a promise object which becomes the definition value when the
   *    promise is fulfilled.
   */
  _getDefinition: function (stmt) {
    var that = this,
        globals = that.globals;
    var deferred = defer();
    if (_.isEqual(that.config.platform, NODE)) {
      formInput(globals.response.body)
      .then(function (forms) {
        var value = forms[stmt.formIndex]['values'][stmt.fieldName];
        deferred.resolve(value);
      });
    }
    else if (_.isEqual(that.config.platform, FX)) {
      console.log('Not available in firefox');
      deferred.resolve(false);
    }
    return deferred.promise;
  },

  /**
   * Run a block of statements
   * @param {Object} block - A JSON object consisting of many statements in it.
   */
  _runBlock: function (block) {
    var that = this;
    var loop = new LoopNext();
    var countStmt = 0;
    var blockResult = [];
    var deferred = defer();
    loop.syncLoop(block.length, function (l) {
      that.run.call(that, block[countStmt])
      .then(function (r) {
        blockResult.push(r);
        countStmt++;
        if (countStmt === block.length) {
          deferred.resolve(blockResult);
        }
        l.next();
      });
    });
    return deferred.promise;
  },

  /**
   * Get variable value from a string variable name, like 'response.body'
   * @param {String} name - String name of the variable
   * @return {String} value - Value of the variable.
   */
  _getValue: function (name) {
    var that = this,
        value = that.globals;

    var parts = name.split('.');
    // iteratively fetch the required value
    parts.forEach(function (part) {
      value = value[part];
    });
    return value;
  },

  /**
   * Checks if a pattern is present a given subject.
   * @param {Regex/String} pattern - A regex or a string to be searched.
   * @param {String} subject - A string on which the search is performed.
   * @return {Boolean} - Result of the operation.
   */
  isPatternFound: function (pattern, subject) {
    var that = this;
    pattern = that.cleanRegex(pattern);
    var re = new RegExp(pattern, 'gi');
    return re.test(subject);
  },

  failMsgGenerator: function (expression, rawData) {
    var finalMsg = 'FAILED Assert - ';
    switch(expression) {
      case 'ZestExpressionStatusCode':
        finalMsg += 'Status Code: expected ' + rawData.expected + ' got ' +
                    rawData.actual;
        break;

      case 'ZestExpressionLength':
        finalMsg += rawData.variableName + ' length: expected ' + rawData.expected +
                    ' got ' + rawData.actual;
        break;

      case 'ZestExpressionRegex':
        finalMsg += rawData.variableName + ' doesnt include regex: ' + rawData.regex;
        break;

      case 'ZestExpressionIsInteger':

        break;
    }

    return finalMsg;
  },

  /**
   * Evaluate zest expressions.
   * @param {Object} exp - A zest expression object.
   * @return {Boolean} - Result of the expression evaluation.
   */
  evalExpression: function (exp) {
    var that = this;
    var result;
    switch(exp.elementType) {
      case 'ZestExpressionStatusCode':
        var expected = exp.code,
            actual = that.globals.response.statusCode;
        that.log('expected statusCode: ', exp.code);
        that.log('actual statusCode: ', that.globals.response.statusCode);
        if (_.isEqual(expected, actual)) {
          result = { result: true };
        } else {
          result = { result: false,
                     message: that.failMsgGenerator(exp.elementType, {
                       expected: expected,
                       actual: actual
                     })
                   }
        }
        break;

      case 'ZestExpressionLength':
        var expected = exp.length,
            actual = that._getValue(exp.variableName).length;
        that.log('actual ' + exp.variableName + '.length:',
                  that._getValue(exp.variableName).length);
        that.log('expected ' + exp.variableName + '.length',
                  exp.length);
        var approx = exp.length * exp.approx / 100;
        that.log('approx:', '+/- ' + approx);
        var upperLimit = exp.length + approx;
        that.log('upperLimit:', upperLimit);
        var lowerLimit = exp.length - approx;
        that.log('lowerLimit:', lowerLimit);
        if ((actual >= lowerLimit) && (actual <= upperLimit)) {
          result = { result: true };
        } else {
          result = { result: false,
                     message: that.failMsgGenerator(exp.elementType, {
                                variableName: exp.variableName,
                                expected: expected,
                                actual: actual
                     })
                   };
        }
        break;

      case 'ZestExpressionRegex':
        that.log('variableName:', exp.variableName);
        that.log('regex:', exp.regex);
        var reg = that.cleanRegex(exp.regex);
        that.log('cleaned regex:', reg);
        var flags = 'g';
        if (! exp.caseExact) {
          flags += 'i';
        }
        var re = new RegExp(reg, flags);
        if (that._getValue(exp.variableName).search(re) > -1) {
          result = { result: true };
        } else {
          result = { result: false,
                     message: that.failMsgGenerator(exp.elementType, {
                       variableName: exp.variableName,
                       regex: exp.regex
                     })
                   };
        }
        break;

      case 'ZestExpressionURL':
        result = { result: false };
        that.log('url:', that.globals.response.url);
        that.log('includeRegexes:', exp.includeRegexes);
        that.log('excludeRegexes:', exp.excludeRegexes);
        if (! _.isEmpty(exp.includeRegexes)) {
          exp.includeRegexes.some(function (pattern) {
            that.log('pattern:', pattern);
            pattern = that.cleanRegex(pattern);
            that.log('cleaned pattern:', pattern);
            if (that.isPatternFound(pattern,
                                    that.globals.response.url)) {
              result = { result: true };
              return true;
            }
          });
        }
        if (! _.isEmpty(exp.excludeRegexes)) {
          exp.excludeRegexes.some(function (pattern) {
            that.log('pattern:', pattern);
            pattern = that.cleanRegex(pattern);
            that.log('pattern:', pattern);
            if (that.isPatternFound(pattern, that.globals.response.url)) {
              result = { result: false };
              return true;
            }
          });
        }
        break;

      case 'ZestExpressionEquals':
        var expected = exp.value,
            real = that._getValue(exp.variableName);
        that.log('response.url:', that._getValue(exp.variableName));
        that.log('value:', exp.value);
        if (! exp.caseExact) {
          expected = expected.toLowerCase();
          real = real.toLowerCase();
        }
        if (_.isEqual(expected, real)) {
          result = { result: true };
        } else {
          result = { result: false };
        }
        break;

      case 'ZestExpressionResponseTime':
        var expected = exp.timeInMs,
            real = that.globals.response.responseTimeInMs;
        that.log('real TimeInMs:', real);
        that.log('expected TimeInMs:', expected);
        if (exp.greaterThan) {
          result = { result: (real > expected) };
        } else {
          result = { result: (_.isEqual(real, expected)) };
        }
        break;

      case 'ZestExpressionIsInteger':
        var num = parseInt(that._getValue(exp.variableName));
        if (isNaN(num)) {
          result = { result: false };
        } else {
          result = { result: true };
        }
        break;

      default:
        throw 'Unknown expression';
    }

    if (exp.not) {
      result.result = ! result.result;
      return result;
    } else {
      return result;
    }
  },

  /**
   * Run a statement.
   * @param {Object} stmt - A zest statement object.
   * @return {Promise} - A promise of completing the statement execution.
   */
  run: function (stmt) {
    var that = this;
    var deferred = defer();
    that.log('running statement: ', [stmt.index, stmt.elementType]);

    switch (stmt.elementType) {
      case 'ZestComment':
        deferred.resolve({});
        break;

      case 'ZestRequest':
        var startTime, stopTime;
        that.globals.requestResult = true;
        that.globals.resultMessage = '';

        if (_.isEqual(that.config.platform, NODE)) {
          /** node.js request **/
          var options = {
            url: stmt.url,
            headers: simpleHeaders.parse(stmt.headers) || '',
            body: stmt.data || '',
            method: stmt.method,
            followRedirect: stmt.followRedirects
          };
          if (! _.isEmpty(stmt.cookies)) {
            utils.appendCookies(stmt);
            options.headers = simpleHeaders.parse(stmt.headers);
          }

          that.log('request options:', options);
          that.globals.request = options;

          startTime = new Date().getTime();
          var r = request(options, function (error, response, body) {
            if (!error) {
              stopTime = new Date().getTime();
              var opts = {
                httpVersion: response.httpVersion,
                statusCode: response.statusCode
              };
              that.globals.response = {
                url: response.request.uri.href,
                headers: simpleHeaders.stringify(response.headers, opts) || '',
                body: body,
                statusCode: response.statusCode,
                responseTimeInMs: (stopTime - startTime)
              }
              that.log('response: ', that.globals.response);
              if (! _.isEmpty(stmt.assertions)) {
                var evalResult;
                stmt.assertions.some(function (exp) {
                  that.log('assertion expression:', exp.rootExpression.elementType);
                  evalResult = that.evalExpression(exp.rootExpression);
                  if (! evalResult.result) {
                    that.globals.requestResult = false;
                    that.globals.resultMessage = evalResult.message;
                    return true;
                  }
                });
              }
              deferred.resolve({
                result: that.globals.requestResult,
                message: that.globals.resultMessage || '',
                method: that.globals.request.method,
                url: that.globals.request.url,
                code: that.globals.response.statusCode,
                rtt: that.globals.response.responseTimeInMs + ' ms',
                type: stmt.elementType
              });
            } else {
              deferred.resolve('error in request');
            }
          });
          /** end of node.js request **/

        } else if (_.isEqual(that.config.platform, FX)) {
          var fullHeaders = simpleHeaders.parse(stmt.headers) || '';
          if (! _.isEmpty(stmt.cookies)) {
            utils.appendCookies(stmt);
            fullHeaders = simpleHeaders.parse(stmt.headers);
          }
          var options = {
            url: stmt.url,
            headers: fullHeaders,
            content: stmt.data || '',
            onComplete: function (response) {
              stopTime = new Date().getTime();
              that.globals.response = {
                url: that.globals.request.url,
                headers: response.headers,
                body: response.text,
                statusCode: response.status,
                responseTimeInMs: (stopTime - startTime)
              }
              that.log('response: ', that.globals.response);
              if (! _.isEmpty(stmt.assertions)) {
                var evalResult;
                stmt.assertions.some(function (exp) {
                  evalResult = that.evalExpression(exp.rootExpression);
                  if (! evalResult.result) {
                    that.globals.requestResult = false;
                    that.globals.resultMessage = evalResult.message;
                    return true;
                  }
                });
              }
              deferred.resolve({
                result: that.globals.requestResult,
                message: that.globals.resultMessage,
                method: that.globals.request.method,
                url: that.globals.request.url,
                code: that.globals.response.statusCode,
                rtt: that.globals.response.responseTimeInMs + ' ms',
                type: stmt.elementType
              });
            }
          }

          that.globals.request = {
            url: options.url,
            headers: options.headers,
            body: options.content,
            method: options.method,
            followRedirect: true
          }
          var aReq = request(options);
          if (stmt.method === 'GET') {
            aReq.get();
          } else if (stmt.method === 'POST') {
            aReq.post();
          }
          startTime = new Date().getTime();
        }
        break;

      case 'ZestConditional':
        //if (_.isEqual(that._getValue(stmt.rootExpression.variableName),
        //              stmt.rootExpression.value)) {
        if (that.evalExpression(stmt.rootExpression).result) {
          that._runBlock(stmt.ifStatements)
          .then(function (r) {
            deferred.resolve(r);
          });
        } else {
          that._runBlock(stmt.elseStatements)
          .then(function (r) {
            deferred.resolve(r);
          });
        }
        break;

      case 'ZestAssignString':
        that.globals[stmt.variableName] = stmt.string;
        deferred.resolve({});
        break;

      case 'ZestAssignRandomInteger':
        that.globals[stmt.variableName] = 
          (rand.intBetween(stmt.minInt, stmt.maxInt)).toString();
        deferred.resolve({});
        break;

      case 'ZestAssignFieldValue':
        that._getDefinition(stmt.fieldDefinition)
        .then(function (value) {
          that.globals[stmt.variableName] = value;
          deferred.resolve({});
        });
        break;

      case 'ZestAssignReplace':
        if (stmt.regex) {
          var reg = stmt.replace;
          that.log('pattern:', reg);
          reg = that.cleanRegex(reg);
          that.log('cleaned pattern:', reg);
          var re = new RegExp(reg, 'g');
        } else {
          var re = new RegExp(stmt.replace, 'g');
        }
        that.globals[stmt.variableName] = that._getValue(stmt.variableName).replace(
                                       re, stmt.replacement
                                     );
        deferred.resolve({});
        break;

      case 'ZestAssignStringDelimiters':
        var location, subject, start, end;
        if (stmt.location === 'HEAD') {
          location = 'response.headers';
        } else if (stmt.location === 'BODY') {
          location = 'response.body';
        }
        that.log('location:', location);
        subject = that._getValue(location);
        start = subject.indexOf(stmt.prefix) + stmt.prefix.length;
        end = subject.indexOf(stmt.postfix);
        that.globals[stmt.variableName] = subject.slice(start, end);
        that.log('String:', that.globals[stmt.variableName]);
        deferred.resolve({});
        break;

      case 'ZestAssignRegexDelimiters':
        var location, subject, start, end;
        if (stmt.location === 'HEAD') {
          location = 'response.headers';
        } else if (stmt.location === 'BODY') {
          location = 'response.body';
        }
        that.log('location:', location);
        subject = that._getValue(location);
        var prefixReg = that.cleanRegex(stmt.prefix);
        var startRegex = new RegExp(prefixReg);
        var postfixReg = that.cleanRegex(stmt.postfix);
        var endRegex = new RegExp(postfixReg);
        var word = subject.match(startRegex)[0];
        start = subject.search(startRegex) + word.length;
        end = subject.search(endRegex);
        that.globals[stmt.variableName] = subject.slice(start, end);
        that.log('String:', that.globals[stmt.variableName]);
        deferred.resolve({});
        break;

      case 'ZestLoopString':
        var tokens = stmt.set.tokens;
        var loopVar = stmt.variableName;
        var count = 0;
        var loopResult = [];
        var loop = new LoopNext();
        loop.syncLoop(tokens.length, function (l) {
          that.globals[loopVar] = tokens[count];
          that._runBlock(stmt.statements)
          .then(function (r) {
            loopResult.push(r);
            count++;
            if (count === stmt.set.tokens.length) {
              deferred.resolve(loopResult);
            }
            l.next();
          });
        });
        break;

      case 'ZestLoopFile':
        break;

      case 'ZestLoopInteger':
        var loopVar = stmt.variableName;
        for (var i = stmt.set.start; i < stmt.set.end; i += stmt.set.step) {
          that.globals[loopVar] = i;
          for (var j = 0; j < stmt.statements.length; j++) {
            that.run(stmt.statements[j]);
          }
        }
        deferred.resolve({});
        break;

      case 'ZestLoopClientElements':
        break;

      case 'ZestLoopRegex':
        var loopVar = stmt.variableName;
        var reg = that.cleanRegex(stmt.set.regex);
        var re = new RegExp(reg, 'g');
        var tokens = that._getValue(stmt.set.inputVariableName)
                         .match(re);
        var count = 0;
        var loopResult = [];
        var loop = new LoopNext();
        loop.syncLoop(tokens.length, function (l) {
          that.globals[loopVar] = tokens[count];
          that._runBlock(stmt.statements)
          .then(function (r) {
            loopResult.push(r);
            count++;
            if (count === tokens.length) {
              deferred.resolve(loopResult);
            }
            l.next();
          });
        });
        break;

      case 'ZestActionPrint':
        var message = that._findAndReplace(stmt.message);
        that.log('print:', message);
        deferred.resolve({ print: message,
                           type: stmt.elementType });
        break;

      case 'ZestActionSleep':
        if (_.isEqual(that.config.platform, NODE)) {
          setTimeout(function () {
            deferred.resolve({});
          }, stmt.milliseconds);
        } else if (_.isEqual(that.config.platform, FX)) {
          _setTimeout(function () {
            deferred.resolve({});
          }, stmt.milliseconds);
        }
        break;

      case 'ZestActionFail':
        var message = that._findAndReplace(stmt.message)
        that.log('Failed:', message);
        deferred.resolve({ result: false,
                           print: message,
                           priority: stmt.priority,
                           type: stmt.elementType });
        break;

      case 'ZestAssignCalc':
        var oprndA, oprndB;
        if (typeof(stmt.operandA) === 'number') {
          var oprndA = stmt.operandA;
        } else {
          var oprndA = parseFloat(that._getValue(stmt.operandA));
        }

        if (typeof(stmt.operandB) === 'number') {
          var oprndB = stmt.operandB;
        } else {
          var oprndB = parseFloat(that._getValue(stmt.operandB));
        }

        switch (stmt.operation) {
          case 'add':
            that.globals[stmt.variableName] = (oprndA + oprndB).toString();
            break;

          case 'subtract':
            that.globals[stmt.variableName] = (oprndA - oprndB).toString();
            break;

          case 'multiply':
            that.globals[stmt.variableName] = (oprndA * oprndB).toString();
            break;

          case 'divide':
            that.globals[stmt.variableName] = (oprndA / oprndB).toString();
            break;

          default:
            console.log('unknown operation');
        }
        deferred.resolve({});
        break;

      default:
        throw 'Unknown statement';
    }
    return deferred.promise;
  },

  /**
   * Clear unnecessary dirt from regex string.
   * @param {String} str - a regex string
   * @return {String} - a clean regex string
   */
  cleanRegex: function (str) {
    if (_.isEmpty(str)) {
      return str;
    }
    var regexp = str;
    if ((_.first(str) === '/') && (_.last(str) === '/')) {
      regexp = regexp.slice(1, regexp.length - 1);
    }
    return regexp;
  }
}
