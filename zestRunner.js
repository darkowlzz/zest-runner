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
 *   Available options are sourceType, file, zest, debug.
 *   Example:
 *   opts = {
 *     sourceType: 'file',
 *     file: 'path/to/zestfile',
 *     debug: true
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
                              platform: this.config.platform});
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


  /**
   * Validate values of script parameters.
   * @return {Object} - validity result.
   *    {
   *      valid: (a Boolean with validity result),
   *      message: (a String with reason for invalidity)
   *    }
   */
  _validateParams: function () {
    var that = this;
    var valid = true,
        defined = [],
        missing = [],
        tokens = that.script.parameters.tokens;
    // If `parameters.tokens` is defined and `tokens` is not empty perform
    // the testing.
    if ((! _.isUndefined(tokens)) && (! _.isEmpty(tokens))) {
      new JefNode(tokens).filter(function(ele) {
        // Only when the token key is defined but value is empty, make as
        // invalid and add the undefined tokens to `missing`.
        if (! _.isUndefined(ele.key)) {
          if (_.isEmpty(ele.value)) {
            valid = false;
            missing.push(ele.key);
          } else {
            defined.push(ele.key);
          }
        }
      });
    }
    if (valid) {
      // define the param tokens in runtime namespace.
      defined.forEach(function (key) {
        that.log('defining', key);
        that.runtime.setDefinition(key, tokens[key]);
      });
    }
    // Return validity result.
    return {
      valid: valid,
      message: ('Undefined tokens ' + missing)
    };
  },


  // Run the whole script at once.
  run: function () {
    var that = this;
    var loop = new LoopNext();
    // Reset run counter.
    that.reset();
    var results = [];
    var deferred = defer();
    var valid = that._validateParams();
    if (! valid.valid) {
      throw 'ERROR: ' + valid.message;
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
          if (that.count === that.script.statements.length) {
            that.reset();
            deferred.resolve(results);
          }
          l.next();
        }
      });
    });
    return deferred.promise;
  },


  // Run the script one statement at a time.
  // NEED TO BE FIXED - INCOMPLETE
  runNext: function () {
    var deferred = defer();
    var that = this;
    if (that.count >= that.script.statements.length) {
      console.log('Nothing to run');
      deferred.resolve('STOP');
    } else {
      that.runtime.run(that.script.statements[that.count])
      .then(function (r) {
        if (r[0] === 'fail') {
          that.log('STOP', r);
          deferred.resolve(r);
        }
        that.log('one statement executed', '');
        that.count++;
        deferred.resolve(r);
      });
    }
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
