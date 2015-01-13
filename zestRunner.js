'use strict';

module.exports = ZestRunner;

var ZestCreator = require('zest-creator'),
    Runtime     = require('./runtime'),
    utils       = require('./utils'),
    Q           = require('q'),
    _           = require('lodash');


var DEBUG = true;

/**
 * Zest Runner.
 * @param {object} opts
 *   Options for setting up zestrunner.
 *   Available options are sourceType, file, zest, debug.
 *   Example:
 *   opts = {
 *     sourceType: 'file',
 *     file: 'path/to/zestfile',
 *     debug: true
 *   }
 */
function ZestRunner (opts) {
  opts = opts || {};

  if (opts.sourceType === 'file') {
    this.script = new ZestCreator({file: opts.file});
  } else if (opts.sourceType === 'object') {
    this.script = new ZestCreator(opts, opts.zest);
  }

  this.config = _.defaults(opts, {
    debug: false
  });

  this.runtime = new Runtime();
}

ZestRunner.prototype = {
  // run the script
  run: function () {
    var that = this;
    var syncLoop1 = new utils.SyncLoop();
    var count = 0;
    return Q.Promise(function (resolve, reject) {
      syncLoop1.syncLoop(that.script.statements.length, function (loop) {
        that.runtime.run(that.script.statements[count])
        .then(function () {
          that.log('ran statement', count);
          count++;
          if (count === that.script.statements.length) {
            resolve(true);
          }
          loop.next();
        });
      });
    });
  },

  // Print debug statements
  log: function (message, args) {
    if (this.config.debug) {
      console.log('DEBUG:', message, args);
    }
  }
};
