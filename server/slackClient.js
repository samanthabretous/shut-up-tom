const { RtmClient } = require('@slack/client');
const { CLIENT_EVENTS } = require('@slack/client');
const { RTM_EVENTS } = require('@slack/client');

const handleOnAuthenticated = (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
};

const handleOnMessage = (rtm, nlp, message) => {
  nlp.ask(message.text, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    if(!res.intent) {
      return rtm.sendMessage('Sorry I dont know what you are talking about', message.channel);
    } else if (res.intent[0].value === 'time' && res.location) {
      return rtm.sendMessage(`I don't yet know the time in ${res.location[0].value}`, message.channel);
    } else {
      console.log(res)
    }
    rtm.sendMessage('Sorry, I did not understand', message.channel, () => {

    });
  });
};

const addAuthentiatedHandler = (rtm, handler) => {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
};

module.exports.init = function slackClient(token, logLevel, nlp) {
  const rtm = new RtmClient(token, { logLevel });
  addAuthentiatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, message => handleOnMessage(rtm, nlp, message));
  return rtm;
};

module.exports.addAuthentiatedHandler = addAuthentiatedHandler;
