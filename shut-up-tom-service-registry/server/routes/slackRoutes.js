const router = require('express').Router();
const request = require('superagent');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../../../.env') });
module.exports = (registry) => {
  router.get('/auth', (req, res) => {
    // authorize slack user
    request.post(`https://slack.com/api/oauth.access?client_id=${process.env.SLACK_SHUT_UP_TOM_CLIENT_ID}&client_secret=${process.env.SLACK_SHUT_UP_TOM_CLIENT_SECRET}&code=${req.query.code}`)
    .then((success, failure) => {
      console.log(success.body);
      const databaseService = registry.get('mongo');
      console.log(databaseService);
    })
    //   // post new team into database to store authorization tokens
    //   request.post(`http://${res.body.ip}:${res.body.port}/team`)
    //   .send()
    //   .end(() => {
    //
    //     res.render('dashboard', { title: 'Shut Up Tom - Dashboard' });
    //   })
    // });
  })
  router.post('/command', (req, res) => {
    console.log(res);
    res.send('sending data back bitches')
  });

  return router;
}
