# zest-runner

[![Build Status](https://travis-ci.org/darkowlzz/zest-runner.svg?branch=master)](https://travis-ci.org/darkowlzz/zest-runner)

[![NPM](https://nodei.co/npm/zest-runner.png)](https://nodei.co/npm/zest-runner/)

A runtime for Zest scripts.

## To use

  1. Install it:
  
    ```bash
    $ npm i zest-runner
    ```
    
  2. Require it and use:

    ```js
    var ZestRunner = require('zest-runner');
    var opts = {
      sourceType: 'file',
      file: 'abc.zst'
    };
    var zr = new ZestRunner(opts);
    zr.run();
    ```

## Example

Run zest script from a file.

```js
var ZestRunner = require('zest-runner');
var opts = {
  sourceType: 'file',
  file: 'abc.zst'
};
var zr = new ZestRunner(opts);
zr.run().then(resultHandler); // Run the script, returns a promise
```
`run()` returns a javascript promise object, which could be used with `.then`.

```js
zr.run()
.then(function (r) {
  // parse the result and use
});
```
Example of a run [result](https://pastebin.mozilla.org/8823086).

Run zest script from a json object.

```js
var opts = {
  sourceType: 'object',
  zest: objData
};
var zr = new ZestRunner(opts);
zr.run().then(resultHandler);
```

## Tests

To run the test locally, add firefox path in config.sh and run `npm test`.

## LICENSE

MPL
