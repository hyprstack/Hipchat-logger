/**
 * Created by mario (https://github.com/hyprstack) on 18/03/2016.
 */
'use strict';

function HipChatLogger(roomName) {
  var main = require('./lib/modules/main');
  var self = this;

  main.run('./config.json', function (err) {
    if (err) {
      console.log('There was an error setting up the configs: ' + err);
      return;
    }
    // do some cool stuff here - define functions to log info and set room
  });

}

module.export = HipChatLogger;



