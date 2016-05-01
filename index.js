/**
 * Created by mario (https://github.com/hyprstack) on 18/03/2016.
 */
'use strict';

function HipChatLogger(params) {
  //params is {'room-name': <name of room>}
  var main = require('./lib/modules/main');
  var requestHandle = require('./lib/modules/request-manager/http-request-module');
  var extend = require('util')._extend;
  var jsonfile = require('jsonfile');
  var self = this;

  var defaults = {
    'room-name': '', //room id for hipchat
    'notify': false // default is set to false - true sets room notification for user
  };
  if (!params['room-name']) {
    console.log('Error: Room-id is missing in params object!');
    return;
  }

  self.config = extend(defaults, params);

  self.logger = function (msg, fnName, colour) {
    if (typeof msg !== 'string') {
      msg = JSON.stringify(msg, null, 2);
    }
    var access_token = jsonfile.readFileSync('./config.json')['hip-chat-access-token'];
    requestHandle.sendHipMessage(self.config['room-name'], colour, msg, fnName, self.config.notify, access_token);
  };

  self.info = function (msg, fnName) {
    self.logger(msg, fnName, 'gray');
  };
  self.warning = function (msg, fnName) {
    self.logger(msg, fnName, 'yellow');
  };
  self.error = function (msg, fnName) {
    self.logger(msg, fnName, 'red');
  };

  main.run('./config.json', function (err) {
    if (err) {
      console.log('There was an error setting up the configs: ' + err);
      return;
    }
    return self;
  });
}

module.exports = HipChatLogger;



