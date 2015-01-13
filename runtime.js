'use strict';

module.exports = Runtime;

var _     = require('lodash'),
    rand  = require('random-seed').create(),
    utils = require('./utils'),
    Q     = require('q');


function Runtime (opts) {
  opts = opts || {};

  this.config = _.defaults(opts, {
    debug: false
  });

  this.globals = {};
}

Runtime.prototype = {

  // Print debug statements
  log: function (message, args) {
    if (this.config.debug) {
      console.log('DEBUG: ', message, args);
    }
  },

  // Run a block of statements
  runBlock: function (block) {
    var that = this;
    var syncLoop = new utils.SyncLoop();
    var countStmt = 0;
    return Q.Promise(function (resolve, reject) {
      syncLoop.syncLoop(block.length, function (l) {
        that.run.call(that, block[countStmt])
        .then(function () {
          countStmt++;
          if (countStmt === block.length) {
            resolve(true);
          }
          l.next();
        });
      });
    });
  },

  // Run a statement
  run: function (stmt) {
    var that = this;
    that.log('running statement: ', [stmt.index, stmt.elementType]);
    return Q.Promise(function (resolve, reject) {
      switch (stmt.elementType) {
        case 'ZestComment':
          resolve(true);
          break;

        case 'ZestRequest':
          break;

        case 'ZestConditional':
          if (that.globals[stmt.rootExpression.variableName] ===
              stmt.rootExpression.value) {
            that.runBlock(stmt.ifStatements)
            .then(function () {
              resolve(true);
            });
          } else {
            that.runBlock(stmt.elseStatements)
            .then(function () {
              resolve(true);
            });
          }
          break;

        case 'ZestAssignString':
          that.globals[stmt.variableName] = stmt.string;
          resolve(true);
          break;

        case 'ZestAssignRandomInteger':
          that.globals[stmt.variableName] = 
            (rand.intBetween(stmt.minInt, stmt.maxInt)).toString();
          resolve(true);
          break;

        case 'ZestAssignFieldDefinition':
          break;

        case 'ZestAssignReplace':
          if (stmt.regex) {
            // FIXME: create proper regex when regex is true
            var re = new RegExp(stmt.replace, 'g');
          } else {
            var re = new RegExp(stmt.replace, 'g');
          }
          that.globals[stmt.variableName] = that.globals[stmt.variableName].replace(
                                         re, stmt.replacement
                                       );
          resolve(true);
          break;

        case 'ZestAssignStringDelimiters':
          break;

        case 'ZestAssignRegexDelimiters':
          break;

        case 'ZestLoopString':
          var tokens = stmt.set.tokens;
          var loopVar = stmt.variableName;
          var count = 0;
          var syncLoop1 = new utils.SyncLoop();
          syncLoop1.syncLoop(tokens.length, function(loop) {
            that.globals[loopVar] = tokens[count];
            that.runBlock(stmt.statements)
            .then(function () {
              count++;
              if (count === stmt.set.tokens.length) {
                resolve(true);
              }
              loop.next();
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
          resolve(true);
          break;

        case 'ZestLoopClientElements':
          break;

        case 'ZestActionPrint':
          var globals = that.globals;
          var message = stmt.message.replace(/({{\w+}})/g,
            function (matchWord) {
              var variables = matchWord.match(/(\w+)/g);
              return globals[variables[0]];
            }
          );
          that.log('print: ', message);
          resolve(message);
          break;

        case 'ZestActionSleep':
          setTimeout(function () {
            resolve(true);
          }, stmt.milliseconds);
          break;

        case 'ZestActionFail':
          that.log('Failed:', stmt.message);
          resolve('fail');
          break;

        case 'ZestAssignCalc':
          var oprndA, oprndB;
          if (typeof(stmt.operandA) === 'number') {
            var oprndA = stmt.operandA;
          } else {
            var oprndA = parseFloat(that.globals[stmt.operandA]);
          }

          if (typeof(stmt.operandB) === 'number') {
            var oprndB = stmt.operandB;
          } else {
            var oprndB = parseFloat(that.globals[stmt.operandB]);
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
          resolve(true);
          break;

        default:
          throw 'Unknown statement';
      }
    });
  }
}
