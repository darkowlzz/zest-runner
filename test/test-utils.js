'use strict';

var utils  = require('../utils'),
    should = require('should');

var statement = {
  "url": "http://example.com/",
  "data": "",
  "method": "GET",
  "headers": "Content-Type: application/x-www-form-urlencoded\r\n",
  "response": {},
  "assertions": [],
  "followRedirects": true,
  "cookies": [
    {
      "cookieDomain": "example.com",
      "cookiePath": "/",
      "isSecure": false,
      "hasPathAttribute": false,
      "hasDomainAttribute": false,
      "cookieVersion": 0,
      "name": "username",
      "value": "foo"
    }  
  ],
  "index": 29,
  "elementType": "ZestRequest"
}

describe('==== test utils ====', function () {
  it('append cookies to headers', function () {
    var expected = 'Content-Type: application/x-www-form-urlencoded\r\nSet-Cookie: username=foo; Path=/\r\n';
    utils.appendCookies(statement);
    statement.headers.should.be.exactly(expected);
  });
});
