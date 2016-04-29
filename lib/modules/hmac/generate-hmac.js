/**
 * Created by mario (https://github.com/hyprstack) on 29/04/2016.
 */
'use strict';

var crypto = require('crypto');
var generateHMAC = {};

generateHMAC.generate = function (secret, callback) {
  var hmac = crypto.createHmac('sha256', secret);
  hmac.setEncoding('base64');
  hmac.end('hipchat-logger', function () {
    var hash = hmac.read();
    callback(hash);
  });
};

module.exports = generateHMAC;