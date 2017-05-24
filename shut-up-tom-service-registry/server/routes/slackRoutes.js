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
      res.redirect(`/info`)
    })
  })
  router.post('/command', (req, res) => {
    const databaseRegistry = registry.get('mongo');
    console.log(databaseRegistry);
    console.log(`http://${databaseRegistry.ip}:${databaseRegistry.port}/api/sound/${req.body.team_id}`);
    request.get(`http://${databaseRegistry.ip}:${databaseRegistry.port}/api/sound/${req.body.team_id}`)
    .then((success, failure) => {
      if (failure) res.send("Couldn't find what you are looking for")
      else if(success.body.noDevice) {
        res.send('Please hook up your device');
      } else {

        res.send(`Wow it is ${success.body.decibel}db in here`);
      }
    });
  });

  return router;
}
