const router = require('express').Router();
const request = require('superagent');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../../../.env') });
module.exports = (registry) => {
  router.get('/auth', (req, res) => {
    // authorize slack user
    request.post(`https://slack.com/api/oauth.access?client_id=${process.env.SLACK_SHUT_UP_TOM_CLIENT_ID}&client_secret=${process.env.SLACK_SHUT_UP_TOM_CLIENT_SECRET}&code=${req.query.code}`)
    .then((success, failure) => {
      return {
        service: registry.get('mongo'),
        slackAuth: success.body,
      };
    })
    .then((data) => {
      if(!data.service) {
        throw new Error(`Could not find the MongoDB microService`)
      }
      return request.post(`http://${data.service.ip}:${data.service.port}/api/team`)
        .send(data.slackAuth)
    })
    .then((success, failure) => {
      // console.log(failure);
      res.cookie('team_id' , success.body.team_id)
      // if(failure) {
      //
      // }
      res.redirect(`/dashboard`)
    })
  })
  router.post('/command', (req, res) => {
    console.log(res);
    res.send('sending data back bitches')
  });

  return router;
}
