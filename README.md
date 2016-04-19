<!--
  Title: Node-Hipchat-Logger
  Description: A nodejs app that lets you log directly from your node app to a hipchat room.
  Author: hyprstack
  -->

# Node-Hipchat-Logger
Nodejs Hipchat Logger - Get up to 100 messages every 5 minutes directly from your node app to a [hipchat](https://hipchat.com/) room.

A great tool to make development easier when running apps on remote environments.

__Note:__ Detailed instructions on how to use and working code to come shortly!

### Notes:

 - Is there a url I can send a request to, in order to retrieve this [personal access token](https://developer.atlassian.com/hipchat/guide/hipchat-rest-api/api-access-tokens)?
 - If there isn't, how can I make my project any better/different from [nkohari](https://github.com/nkohari/node-hipchat)?

---

- Should allow user to decide which room to send message.
- Would be ideal if a request could be sent to hipchat in order to retrieve the access token, and thus avoid having to force the user
to go to the hip chat website and get the token, store it and then pass it in as a parameter to the logger.
- Would allow me to stote the retrieved token in a config file generated at the written to the root of the logger module project.
- This would give the user the freedom to later remove the node-module and not have to worry about managing the config file.
- It would also avoid having to constantly send a request to hip-chat to retrieve the token.
