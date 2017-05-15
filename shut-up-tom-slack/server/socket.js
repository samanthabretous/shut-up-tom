const request = require('superagent');
const soundClient = require('./soundClient');

// get the service object related to sound microservice so we have access to the ip address and port
const findSoundService = (registry, socket) => {
  const soundService = registry.get('sound');
  if (soundService) {
    soundPolling(socket, soundService)
    setInterval(() => soundPolling(socket, soundService), 250)
    return soundService;
  } else {
    console.log('finding.....');
    return setTimeout(() => findSoundService(registry, socket), 250);
  }
}

// constantly as the sound microservice for new infomation
const soundPolling = (socket, service) => {
  request.get(`http://${service.ip}:${service.port}/service`, (err, res) => {
    if(err || res.statusCode !== 200 || !res.body.result) {
      console.log(err);
    }
    socket.emit('updateData', { amps: res.body.result });
  });
}

module.exports = (app, io, registry) => {
  io.on('connection', (socket) => {
    console.log('socket connected');
    const soundService = findSoundService(registry, socket);
  });
};
