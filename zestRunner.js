module.exports = ZestRunner;

var ZestCreator = require('zest-creator'),
    Runtime     = require('./runtime'),
    LoopNext    = require('loopnext'),
    _           = require('lodash'),
    JefNode     = require('json-easy-filter').JefNode;

var Q, defer;
var NODE = 'node',
    FX   = 'firefox';

var DEBUG = true;

/**
 * Zest Runner.
 * @param {object} opts
 *   Options for setting up zestrunner.
 *   Available options are sourceType, file, zest, debug, tokens.
 *   Example:
 *   opts = {
 *     sourceType: 'file',
 *     file: 'path/to/zestfile',
 *     debug: true,
 *     tokens: {}
 *   }
 */
function ZestRunner (opts) {
  'use strict';

  opts = opts || {};
  var zc;

  // Create script depending on they type of source.
  if (opts.sourceType === 'file') {
    zc = new ZestCreator({file: opts.file});
  } else if (opts.sourceType === 'object') {
    zc = new ZestCreator(opts, opts.zest);
  }
  this.script = zc.getZest();

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
                              platform: this.config.platform,
                              type: this.script.type});
  this.count = 0;
}


ZestRunner.prototype = {

  /**
   * Add result of a statement to result of the whole script.
   * @param {Object} results - result of the whole script.
   * @param {Object} r - result of a statement.
   */
  _addToResults: function (results, r) {
    if (! _.isEmpty(r)) {
      results.push(r);
    }
  },


  // Initialize all the tokens values.
  _initializeTokens: function (argTokens) {
    var that = this,
        tokens, tokenStart, tokenEnd;

    if (_.isUndefined(argTokens)) {
      tokens = that.script.parameters.tokens,
      tokenStart = that.script.parameters.tokenStart,
      tokenEnd = that.script.parameters.tokenEnd;

      if ((! _.isUndefined(tokenStart)) && (! _.isEmpty(tokenStart)) &&
          (! _.isUndefined(tokenEnd)) && (! _.isEmpty(tokenEnd))) {
        that.runtime.setDefinition('tokenStart', tokenStart);
        that.log('tokenStart:', tokenStart);
        that.runtime.setDefinition('tokenEnd', tokenEnd);
        that.log('tokenEnd:', tokenEnd);
      }
    } else {
      tokens = argTokens;
    }

    if ((! _.isUndefined(tokens)) && (! _.isEmpty(tokens))) {
      new JefNode(tokens).filter(function (ele) {
        if (! _.isUndefined(ele.key)) {
          that.runtime.setDefinition(ele.key, ele.value);
        }
      });
    }
  },


  // Run the whole script at once.
  run: function () {
    var that = this;
    var loop = new LoopNext();
    // Reset run counter.
    that.reset();
    var results = [];
    var deferred = defer();
    // initialize script tokens.
    that._initializeTokens();
    // initialize argument tokens.
    if (! _.isUndefined(that.config.tokens)) {
      this._initializeTokens(that.config.tokens);
    }
    var runStatus = true;
    loop.syncLoop(that.script.statements.length, function (l) {
      that.runtime.run(that.script.statements[that.count])
      .then(function (r) {
        if (_.isArray(r)) {
          r.forEach(function (aRslt) {
            if (_.isArray(aRslt)) {
              aRslt.forEach(function (rslt) {
                that._addToResults(results, rslt);
                if (rslt.type === 'ZestActionFail') {
                  runStatus = false;
                  deferred.resolve(results);
                }
              });
            } else if (aRslt.type === 'ZestActionFail') {
              that._addToResults(results, aRslt);
              runStatus = false;
              deferred.resolve(results);
            } else {
              that._addToResults(results, aRslt);
            }
          });
        } else if (r.type === 'ZestActionFail') {
          that._addToResults(results, r);
          that.log('STOP', r);
          runStatus = false;
          deferred.resolve(results);
        } else {
          that._addToResults(results, r);
        }

        if (runStatus) {
          that.count++;
          if (that.count >= that.script.statements.length) {
            that.reset();
            deferred.resolve(results);
          }
          l.next();
        }
      });
    });
    return deferred.promise;
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
