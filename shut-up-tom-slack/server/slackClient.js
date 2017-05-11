const { RtmClient } = require('@slack/client');
const { CLIENT_EVENTS } = require('@slack/client');
const { RTM_EVENTS } = require('@slack/client');

const handleOnAuthenticated = (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
};

const handleOnMessage = (rtm, nlp, registry, message) => {
  // only respond to messages that have are intended for Iris
  if(message.text.toLowerCase().includes('iris')) {
    // npl === witClient
    nlp.ask(message.text, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      try {
        if (!res.intent || !res.intent[0] || !res.intent[0].value) {
          throw new Error('Could not extract intent.');
        }

        const intent = require(`./intents/${res.intent[0].value}Intent`);

        intent.process(res, registry, (error, response) => {
          if (error) {
            console.log(error.message);
            return;
          }
          return rtm.sendMessage(response, message.channel);
        })
      } catch (error) {
        console.log(error);
        console.log(res);
        rtm.sendMessage("Sorry, I don't know what you are talking about!", message.channel);
      }
    });
  }
};

const addAuthentiatedHandler = (rtm, handler) => {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler);
};

module.exports.init = function slackClient(token, logLevel, nlp, serviceRegistry) {
  const rtm = new RtmClient(token, { logLevel });
  addAuthentiatedHandler(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, message => handleOnMessage(rtm, nlp, serviceRegistry, message));
  return rtm;
};

module.exports.addAuthentiatedHandler = addAuthentiatedHandler;
