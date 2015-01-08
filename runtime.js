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
      break;

    case 'ZestAssignStringDelimiters':
      break;

    case 'ZestAssignRegexDelimiters':
      break;

    case 'ZestLoopString':
      break;

    case 'ZestLoopFile':
      break;

    case 'ZestLoopInteger':
      break;

    case 'ZestLoopClientElements':
      break;

    case 'ZestActionPrint':
      break;

    case 'ZestActionSleep':
      break;

    case 'ZestActionFail':
      break;

    default:
      throw 'Unknown statement';
  }
}
exports.run = run;
