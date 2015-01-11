'use strict';

var _    = require('lodash'),
    rand = require('random-seed').create();

var globals = {};

function varList () {
  return globals;
}
exports.varList = varList;

function run (stmt) {
  switch (stmt.elementType) {
    case 'ZestComment':
      break;

    case 'ZestRequest':
      break;

    case 'ZestConditional':
      break;

    case 'ZestAssignString':
      globals[stmt.variableName] = stmt.string;
      break;

    case 'ZestAssignRandomInteger':
      globals[stmt.variableName] = rand.intBetween(stmt.minInt, stmt.maxInt);
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
      globals[stmt.variableName] = globals[stmt.variableName].replace(
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
      for (var i = 0; i < tokens.length; i++) {
        globals[loopVar] = tokens[i];
        for (var j = 0; j < stmt.statements.length; j++) {
          run(stmt.statements[j]);
        }
      }
      // FIXME: Create a way to test it.
      break;

    case 'ZestLoopFile':
      break;

    case 'ZestLoopInteger':
      var loopVar = stmt.variableName;
      for (var i = stmt.set.start; i < stmt.set.end; i += stmt.set.step) {
        globals[loopVar] = i;
        for (var j = 0; j < stmt.statements.length; j++) {
          run(stmt.statements[j]);
        }
      }
      break;

    case 'ZestLoopClientElements':
      break;

    case 'ZestActionPrint':
      var message = stmt.message.replace(/({{\w+}})/g, replacer);
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
        var oprndA = parseFloat(globals[stmt.operandA]);
      }

      if (typeof(stmt.operandB) === 'number') {
        var oprndB = stmt.operandB;
      } else {
        var oprndB = parseFloat(globals[stmt.operandB]);
      }

      switch (stmt.operation) {
        case 'add':
          globals[stmt.variableName] = (oprndA + oprndB).toString();
          break;

        case 'subtract':
          globals[stmt.variableName] = (oprndA - oprndB).toString();
          break;

        case 'multiply':
          globals[stmt.variableName] = (oprndA * oprndB).toString();
          break;

        case 'divide':
          globals[stmt.variableName] = (oprndA / oprndB).toString();
          break;

        default:
          console.log('unknown operation');
      }

      break;

    default:
      throw 'Unknown statement';
  }
}
exports.run = run;

function replacer (matchWord) {
  var variables = matchWord.match(/(\w+)/g);
  return globals[variables[0]];
}
