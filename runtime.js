'use strict';

module.exports = Runtime;

var _     = require('lodash'),
    rand  = require('random-seed').create(),
    utils = require('./utils');


function Runtime () {
  this.globals = {};
}

Runtime.prototype = {

  run: function (stmt) {
    switch (stmt.elementType) {
      case 'ZestComment':
        break;

      case 'ZestRequest':
        break;

      case 'ZestConditional':
        break;

      case 'ZestAssignString':
        this.globals[stmt.variableName] = stmt.string;
        break;

      case 'ZestAssignRandomInteger':
        this.globals[stmt.variableName] = rand.intBetween(stmt.minInt, stmt.maxInt);
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
        this.globals[stmt.variableName] = this.globals[stmt.variableName].replace(
                                       re, stmt.replacement
                                     );
        break;

      case 'ZestAssignStringDelimiters':
        break;

      case 'ZestAssignRegexDelimiters':
        break;

      case 'ZestLoopString':
        var tokens = stmt.set.tokens;
        var loopVar = stmt.variableName;
        var count = 0;
        var that = this;
        utils.syncLoop(tokens.length, function(loop) {
          that.globals[loopVar] = tokens[i];
          var count2 = 0;
          utils.syncLoop(stmt.statements.length, function(loop2) {
            that.run.call(that, stmt.statements[count2]);
            count2++;
            loop2.next();
          });
          count++;
          loop.next();
        });
        break;

      case 'ZestLoopFile':
          break;

      case 'ZestLoopInteger':
        var loopVar = stmt.variableName;
        for (var i = stmt.set.start; i < stmt.set.end; i += stmt.set.step) {
          this.globals[loopVar] = i;
          for (var j = 0; j < stmt.statements.length; j++) {
            this.run(stmt.statements[j]);
          }
        }
        break;

      case 'ZestLoopClientElements':
        break;

      case 'ZestActionPrint':
        var globals = this.globals;
        var message = stmt.message.replace(/({{\w+}})/g, function (matchWord) {
          var variables = matchWord.match(/(\w+)/g);
          return globals[variables[0]];
        });
        break;

      case 'ZestActionSleep':
        break;

      case 'ZestActionFail':
        break;

      case 'ZestAssignCalc':
        var oprndA, oprndB;
        if (typeof(stmt.operandA) === 'number') {
          var oprndA = stmt.operandA;
        } else {
          var oprndA = parseFloat(this.globals[stmt.operandA]);
        }

        if (typeof(stmt.operandB) === 'number') {
          var oprndB = stmt.operandB;
        } else {
          var oprndB = parseFloat(this.globals[stmt.operandB]);
        }

        switch (stmt.operation) {
          case 'add':
            this.globals[stmt.variableName] = (oprndA + oprndB).toString();
            break;

          case 'subtract':
            this.globals[stmt.variableName] = (oprndA - oprndB).toString();
            break;

          case 'multiply':
            this.globals[stmt.variableName] = (oprndA * oprndB).toString();
            break;

          case 'divide':
            this.globals[stmt.variableName] = (oprndA / oprndB).toString();
            break;

          default:
            console.log('unknown operation');
        }

        break;

      default:
        throw 'Unknown statement';
    }
  }
}
