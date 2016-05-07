/**
 * Created by mario (https://github.com/hyprstack) on 29/04/2016.
 */
'use strict';

var http = require('http');
var https = require('https');
var generateHMAC = require('./../hmac/generate-hmac');
var httpRequest = {};

// http request to get or check token from hip-chat integration app
function requestCallback(callback) {
  return function (response) {
    var token = '';
    response.on('data', function (chunk) {
      console.log(chunk);
      token += chunk;
    });

    response.on('end', function () {
      console.log('END');
      callback(null, token);
    });
    
    response.on('error', function (err) {
      console.log('ERRROR');
      callback(err, null);
    });
  };
}

function hmacEnd(host, path, callback) {
  return function (hmacSecret) {
    var options = {
      protocol: 'http:',
      hostname: host,
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'x-node-hipchat-logger-hmac-sha256': hmacSecret,
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'User-Agent': 'hipchat-logger',
        'Connection': 'keep-alive'
      }
    };

    var req = http.request(options, requestCallback(callback));
    req.on('error', function (err) {
      callback(err, null);
      return;
    });
    req.end();
  };
}

httpRequest.sendGetToken = function (host, path, callback) {
  generateHMAC.generate('xx123aardvaark321xx', hmacEnd(host, path, callback));
};

// http request to handle sending of message to hip-chat
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

httpRequest.sendHipMessage = function (roomId, colour, msg, fromFunction, notification, access_token) {
  var optionsForm = {
    color: colour,
    message_format: 'text',
    message: msg,
    from: fromFunction,
    notify: notification
  };
  optionsForm = JSON.stringify(optionsForm);
  var options = {
    protocol: 'https:',
    hostname: 'api.hipchat.com',
    path: '/v2/room/' + roomId + '/notification',
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    }
  };
  var req = https.request(options, endPostHipForm());
  req.write(optionsForm);
  req.on('error', function (err) {
    console.log(err);
    return;
  });
  req.end();
};

module.exports = httpRequest;