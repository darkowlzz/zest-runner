'use strict';

var zestCreator = require('zest-creator');

var DEBUG = true;

function ZestRunner (opts) {
  opts = opts || {};

  this.config = _.defaults(opts, {
    script: null,
    debug: true
  });
}

ZestRunner.prototype = {

};
