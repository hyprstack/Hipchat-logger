/**
 * Created by mario (https://github.com/hyprstack) on 29/04/2016.
 */
'use strict';

var https = require('https');
var generateHMAC = require('./../hmac/generate-hmac');
var config = require('./../../../config.json');
var httpsRequest = {};

// HTTPS request to get or check token from hip-chat integration app
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

httpsRequest.sendGetToken = function (host, path, callback) {
  generateHMAC.generate('1234aardvaark4321', hmacEnd(host, path, callback));
};

// HTTPS request to handle sending of message to hip-chat
function endPostHipForm() {
  return function(res) {
    res.setEncoding('utf-8');
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
    res.on('error', function (err) {
      console.log('Error: ' + err);
    });
    res.on('end', function () {
      console.log('Request to send hipchat message has finished!');
    });
  };
}

httpsRequest.sendHipMessage = function (roomId, colour, msg, fromFunction, notifcation, access_token) {
  var optionsForm = {
    color: colour,
    message: msg,
    from: fromFunction,
    notify: notification // boolean - default set to false
  };
  var options = {
    hostname: 'https://api.hipchat.com',
    path: '/v2/room/' + roomId + '/notification',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Content-Length': new Buffer.byteLength(optionsForm),
      'Authorization': 'Bearer ' + access_token
    }
  };
  https.request(options, endPostHipForm()).write(optionsForm).end();
};

module.exports = httpsRequest;