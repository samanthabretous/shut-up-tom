const router = require('express').Router();
const request = require('superagent');
module.exports = (registry, io, clients) => {
  router.get('/', (req, res) => {

  });

  router.post('/device', (req, res) => {
    const databaseService = registry.get('mongo');
    request.post(`http://${databaseService.ip}:${databaseService.port}/api/sound/${req.cookies.team_id}`)
    .send(req.body)
    .then((success, failure) => {
      console.log("success",success.body.device_name);
      res.send({ deviceName: success.body.device_name})
    })
  });

  router.post('/new-data', (req, res) => {
    const databaseService = registry.get('mongo');
    const slackService = registry.get('slack');
    req.body.slack = slackService;
    request.put(`http://${databaseService.ip}:${databaseService.port}/api/sound/${req.cookies.team_id}`)
    .send(req.body)
    .then((success, failure) => {
      console.log("success",success.body, clients.getClientSocketId(success.body.teamId));
      io.to(clients.getClientSocketId(success.body.teamId)).emit('updateData', { amps: success.body.sound })
    })
  })

  router.post('/add-message', (req, res) => {
    const databaseService = registry.get('mongo');
    console.log(req.body);
    request.post(`http://${databaseService.ip}:${databaseService.port}/api/sound/${req.cookies.team_id}/message`)
    .send(req.body)
    .then((success, failure) => {
      if(failure) console.log(failure);
      else res.send({ messages: success.body.messages });
    })
  })

  return router;
};
