const router = require('express').Router();
const request = require('superagent');
module.exports = (registry, socket, clients) => {
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
      console.log("success",success.body);
      socket.to(clients.getClientSocketId(req.body.team_id)).emit('updateData', { amps: success.body.sound })
    })
  })

  return router;
};
