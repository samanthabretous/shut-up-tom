const app = require('./server');
const http = require('http');
const slackClient = require('./server/slackClient');

const witToken = process.env.WIT_TOKEN || '';
const witClient = require('./server/witClient')(witToken);

const slackToken = process.env.SLACK_API_TOKEN_IRIS || '';
const slackLogLevel = 'verbose';

const serviceRegistry = app.get('serviceRegistry');
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

const server = http.createServer(app);
// this if statement will prevent our express server and test server
// (using supertest) from trying to access the same port at the same time
if (!module.parent) {
  slackClient.addAuthentiatedHandler(rtm, () => {
    // wait to connect to server until slack is connected
    server.listen(process.env.PORT || 2020);
  })
  server.on('listening', () => console.log(`Listening on port ${server.address().port} in ${app.get('env')} mode`))
}

module.exports = server;
