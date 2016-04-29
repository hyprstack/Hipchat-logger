/**
 * Created by mario (https://github.com/hyprstack) on 29/04/2016.
 */
'use strict';

var checkToken = require('./token-checker');
var main = {};

function endCheckToken(callback) {
  return function (err, tokenExistence) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, tokenExistence);
  };
}

main.run = function (fileName, callback) {
  checkToken.check(fileName, endCheckToken(callback));
};

module.exports = main;
