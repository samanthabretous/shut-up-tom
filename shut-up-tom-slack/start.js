const { server, app } = require('./server');
const request = require('superagent');
const slackClient = require('./server/slackClient');

const witToken = process.env.WIT_TOKEN || '';
const witClient = require('./server/witClient')(witToken);

const slackToken = process.env.SLACK_API_TOKEN_IRIS || '';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

// this if statement will prevent our express server and test server
// (using supertest) from trying to access the same port at the same time
if (!module.parent) {
  slackClient.addAuthentiatedHandler(rtm, () => {
    // wait to connect to server until slack is connected
    server.listen(/* dynamically created port*/);

    server.on('listening', () => {
      console.log(`Slack is listening on ${server.address().port} in ${app.get('env')} mode.`);

      const announce = () => {
        request.put(`http://127.0.0.1:2020/api/service/slack/${server.address().port}`, (err, res) => {
          if (err) {
            console.log(err);
            console.log('Error connecting to Shut Up Tom Slack');
            return;
          }
          console.log(res.body);
        })
      }
      announce();
      setInterval(announce, 15*1000)
    });
  })
  server.on('listening', () => console.log(`Listening on port ${server.address().port} in ${app.get('env')} mode`))
}
