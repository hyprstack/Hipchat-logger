/**
 * Created by mario (https://github.com/hyprstack) on 29/04/2016.
 */
'use strict';

var jsonfile = require('jsonfile');
var requestHandle = require('./../request-manager/http-request-module');
var checkToken = {};

function endWritefile(callback) {
  return function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, 'exists');
  };
}

function endRequest(fileName, callback) {
  return function (err, token) {
    if (err) {
      callback(err, null);
      return;
    }
    var obj = {
      'hip-chat-access-token': token
    };
    jsonfile.writeFile(fileName, obj, endWritefile(callback));
  };
}

checkToken.check = function (fileName, callback) {
  jsonfile.readFile(fileName, function (err, obj) {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    if (obj['hip-chat-access-token'] === '' || obj['hip-chat-access-token'] === '{}') {
      requestHandle.sendGetToken('localhost', '/get-token', endRequest(fileName, callback));
      return;
    }
    callback(null, 'exists');
  });
};

module.exports = checkToken;