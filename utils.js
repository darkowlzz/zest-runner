'use strict';

var cookie = require('simple-cookie');

function appendCookies (stmt) {
  stmt.cookies.forEach(function (aCookie) {
    stmt.headers += 'Set-Cookie: ' + cookie.stringify(aCookie) + '\r\n';
  });
}
exports.appendCookies = appendCookies;
