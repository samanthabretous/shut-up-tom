const { RtmClient } = require('@slack/client');
const { CLIENT_EVENTS } = require('@slack/client');
const { RTM_EVENTS } = require('@slack/client');

const handleOnAuthenticated = (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
};

const handleOnMessage = (rtm, message) => {
  console.log(message);
  rtm.sendMessage('this is a test message', message.channel, () => {

  });
};

const addAuthentiatedHandler = (rtm, handler) => {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
};

module.exports.init = function slackClient(token, logLevel) {
  const rtm = new RtmClient(token, { logLevel });
  addAuthentiatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, message => handleOnMessage(rtm, message));
  return rtm;
};

module.exports.addAuthentiatedHandler = addAuthentiatedHandler;
