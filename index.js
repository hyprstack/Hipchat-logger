/**
 * Created by mario (https://github.com/hyprstack) on 18/03/2016.
 */
'use strict';

function HipChatLogger(params) {
  var main = require('./lib/modules/main');
  var requestHandle = require('./lib/modules/request-manager/http-request-module');
  var extend = require('util')._extend;
  var jsonfile = require('jsonfile');
  var self = this;

  // ensure config.json exists
  try {
    jsonfile.readFileSync('./config.json');
  } catch (err) {
    jsonfile.writeFileSync('./config.json', {'hip-chat-access-token': ''});
  }

  var defaults = {
    'roomId': '', //room id for hipchat
    'notify': false // default is set to false - true sets room notification for user
  };
  if (!params.roomId) {
    console.log('Error: roomId is missing in params object!');
    return;
  }

  self.config = extend(defaults, params);

  self.logger = function (msg, fnName, colour) {
    if (typeof msg !== 'string') {
      msg = JSON.stringify(msg, null, 2);
    }
    var access_token = jsonfile.readFileSync('./config.json')['hip-chat-access-token'];
    main.run('./config.json', function (err) {
      if (err) {
        console.log('Error running Node-Hipchat-Logger: ' + err);
        return;
      }
      requestHandle.sendHipMessage(self.config.roomId, colour, msg, fnName, self.config.notify, access_token);
    });
  };

  self.info = function (msg, fnName) {
    console.log(arguments);
    console.log('Calling info!');
    self.logger(msg, fnName, 'gray');
  };
  self.warning = function (msg, fnName) {
    self.logger(msg, fnName, 'yellow');
  };
  self.error = function (msg, fnName) {
    self.logger(msg, fnName, 'red');
  };

  return self;
}

module.exports = HipChatLogger;
