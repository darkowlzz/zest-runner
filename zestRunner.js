'use strict';

module.exports = ZestRunner;

var ZestCreator = require('zest-creator'),
    Runtime     = require('./runtime'),
    LoopNext    = require('loopnext'),
    _           = require('lodash');

var Q, defer;
var NODE = 'node',
    FX   = 'firefox';

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

  // Create script depending on they type of source.
  if (opts.sourceType === 'file') {
    this.script = new ZestCreator({file: opts.file});
  } else if (opts.sourceType === 'object') {
    this.script = new ZestCreator(opts, opts.zest);
  }

  // Set default configuration variables.
  this.config = _.defaults(opts, {
    debug: false,
    platform: NODE
  });

  try {
    if (_.isEqual(this.config.platform, NODE)) {
      defer = require('q').defer;
    } 
    else if (_.isEqual(this.config.platform, FX)) {
      defer = require('sdk/core/promise').defer;
    }
  } catch (e) {}

  // Create runtime object and a run counter.
  this.runtime = new Runtime({debug: this.config.debug,
                              platform: this.config.platform});
  this.count = 0;
}

ZestRunner.prototype = {

  // Run the whole script at once.
  run: function () {
    var that = this;
    var loop = new LoopNext();
    // Reset run counter.
    that.reset();
    var deferred = defer();
    loop.syncLoop(that.script.statements.length, function (l) {
      that.runtime.run(that.script.statements[that.count])
      .then(function (r) {
        if (r[0] == 'fail') {
          that.log('STOP', r);
          deferred.resolve(true);
        } else {
          that.count++;
          if (that.count === that.script.statements.length) {
            that.reset();
            deferred.resolve(true);
          }
          l.next();
        }
      });
    });
    return deferred.promise;
  },

  // Run the script one statement at a time.
  runNext: function () {
    var that = this;
    if (that.count >= that.script.statements.length) {
      console.log('Nothing to run');
    } else {
      var deferred = defer();
      that.runtime.run(that.script.statements[that.count])
      .then(function (r) {
        if (r[0] === 'fail') {
          that.log('STOP', r);
          deferred.resolve(true);
        }
        that.log('one statement executed', '');
        that.count++;
        deferred.resolve(true);
      });
      return deferred.promise;
    }
  },

  // Reset the statement run counter.
  reset: function () {
    this.count = 0;
  },

  // Print debug statements
  log: function (message, args) {
    if (this.config.debug) {
      console.log('DEBUG:', message, args);
    }
  }
};
