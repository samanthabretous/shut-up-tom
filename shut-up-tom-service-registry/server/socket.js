const request = require('superagent');
const SocketClients = require('../socketClients');

// get the service object related to sound microservice so we have access to the ip address and port
const findSoundService = (registry, socket) => {
  const soundService = registry.get('sound');
  if (soundService) {
    soundPolling(socket, soundService)
    // setInterval(() => soundPolling(socket, soundService), 3000)
    return soundService;
  } else {
    // recheck registry for infomation about sound service
    return setTimeout(() => findSoundService(registry, socket), 500);
  }
}

// constantly as the sound microservice for new infomation
const soundPolling = (socket, service) => {
  request.get(`http://${service.ip}:${service.port}/api/service/new-data`, (err, res) => {
    if(err || res.statusCode !== 200 || !res || !res.body.result) {
      console.log(err);
    }
    socket.emit('updateData', { amps: res.body.result });
  });
}

module.exports = (app, io, registry) => {
  const clients = new SocketClients;
  // handles all the front end routing
  const clientRoutes = require('./routes/clientRoutes')(registry);
  const slackRoutes = require('./routes/slackRoutes')(registry);
  const soundRoutes = require('./routes/soundRoutes')(registry, io, clients);
  app.use('/', clientRoutes);
  app.use('/slack', slackRoutes);
  app.use('/sound', soundRoutes);

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    // keep track of teams
    socket.on('add-team', (payload) => {
      console.log("teamId", payload.teamId);
      if(payload.teamId) {
        clients.addClient(payload.teamId, socket.id);
      }
    });

    const soundService = findSoundService(registry, socket);
    socket.once('disconnect', () => {
      clients.removeClient(socket.id)
      socket.disconnect();

      console.log('socket disconnected');
    })
  });

};
