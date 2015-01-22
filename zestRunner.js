'use strict';

module.exports = ZestRunner;

var ZestCreator = require('zest-creator'),
    Runtime     = require('./runtime'),
    LoopNext    = require('loopnext'),
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

  this.runtime = new Runtime({debug: this.config.debug});
  this.count = 0;
}

ZestRunner.prototype = {
  // run the script
  run: function () {
    var that = this;
    var loop = new LoopNext();
    that.count = 0;
    return Q.Promise(function (resolve, reject) {
      loop.syncLoop(that.script.statements.length, function (l) {
        that.runtime.run(that.script.statements[that.count])
        .then(function (r) {
          if (r[0] === 'fail') {
            that.log('STOP', r);
            resolve(true);
          } else {
            that.count++;
            if (that.count === that.script.statements.length) {
              resolve(true);
            }
            l.next();
          }
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
