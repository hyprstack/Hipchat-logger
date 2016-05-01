<!--
  Title: Node-Hipchat-Logger
  Description: A nodejs app that lets you log directly from your node app to a hipchat room.
  Author: hyprstack
  -->

# Node-Hipchat-Logger
Nodejs Hipchat Logger - Get up to 100 messages every 5 minutes directly from your node app to a [hipchat](https://hipchat.com/) room.

A great tool to make development easier when running apps on remote environments.

__Note:__ Detailed instructions on how to use and working code to come shortly!

__Installation__

`npm install Node-Hipchat-Logger --save`

__Set-up__


```javascript
var hipLoggerObj = require('Node-Hipchat-Logger');

var hipLogger = new hipLoggerObj({
    'room-name': '<hip-chat-room-id>', // room to send message to
    'notify': true // optional notification alert to user when new message is sent to room - defaults is set to false
});    
```


After instantiating the new object, you can call its `info`, `warning` and `error` message functions.

__Info__  message has colour set to `gray`

__Warning__ message has colour set to `yellow`

__Error__ message has colour set to `red`

Call the functions passing in the `message` you wish to send to the room and `function-name` from which the message originated.


```javascript
// Sending a success message
var successMsg = 'Function has ended with success!';
hipLogger.info(successMsg, 'Function myCoolFunction');

// Sending a warning message
var warningMsg = 'Something has gone wrong! Watch out!';
hipLogger.warning(warningMsg, 'Function checkingFunction');

// Sending an error message
var errorMsg = 'There was an error with running your function!';
// Or you can send an error object
var errorMsg = new Error('There was an error with running your function!');
hipLogger.error(errorMsg, 'Function errorFunction');
```


__How the module works__

The module will write to a config file that is set per project in the module's directory. On first instantiation of a logger object,
`Node-Hipchat-Logger` will check for the existence of a hip-chat access token in the `config.json` file. If an access token already exists,
this one is used for all your requests to the hip-chat api. If there is no access token, `Node-Hipchat-Logger` will issue a request to
get the token from [hip-chat node integartion app](https://github.com/hyprstack/hipchat-integration-token-provider) 
to retrieve a valid access token and then store it in the `config.json` file for the user.

