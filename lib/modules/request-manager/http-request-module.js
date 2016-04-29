/**
 * Created by mario (https://github.com/hyprstack) on 29/04/2016.
 */
'use strict';

var https = require('https');
var generateHMAC = require('./../hmac/generate-hmac');
var config = require('./../../../config.json');
var httpsRequest = {};

function requestCallback(callback) {
  return function (response) {
    var token = '';
    response.on('data', function (chunk) {
      token += chunk;
    });

    response.on('end', function () {
      callback(null, token);
    });
    
    response.on('error', function (err) {
      callback(err, null);
    });
  };
}

function hmacEnd(host, path, callback) {
  return function (hmacSecret) {
    var options = {
      hostname: host,
      path: path,
      method: 'GET',
      headers: {
        'x-node-hipchat-logger-hmac-sha256': hmacSecret,
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'User-Agent': 'hipchat-logger'
      }
    };

    https.request(options, requestCallback(callback)).end();
  };
}

httpsRequest.sendGet = function (host, path, callback) {
  generateHMAC.generate('1234aardvaark4321', hmacEnd(host, path, callback));
};

module.exports = httpsRequest;