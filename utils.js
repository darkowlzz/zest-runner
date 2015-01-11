/**
 * Run loop synchronously.
 * @param {number} iterations - Number of iterations.
 * @param {function} process - Function to be executed in the loop.
 * @param {function} exit - Function to be executed at the end of loop.
 */
function syncLoop(iterations, process, exit) {
  var index = 0,
      done = false,
      shouldExit = false;

  var loop = {
    next: function() {
      if(done) {
        if(shouldExit && exit) {
          return exit();
        }
      }
      if (index < iterations) {
        index++;
        process(loop);
      } else {
        done = true;
        if(exit) exit();
      }
    },
    iteration: function() {
      return index - 1;
    },
    break: function(end) {
      done = true;
      shouldExit = end;
    }
  };
  loop.next();
  return loop;
}
exports.syncLoop = syncLoop;
