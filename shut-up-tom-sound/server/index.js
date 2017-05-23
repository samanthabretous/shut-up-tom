const express = require('express');
const SoundResults = require('./soundResults');

const app = express();
const sound = new SoundResults();

setInterval(() => sound.addResult(sound.getLastResult() + 10), 1000);

app.get('/api/service', (req, res, next) => {
  res.send({ result: sound.getLastResult() })
});

app.get('/api/service/new-data', (req, res) => {
  // only send data back if new infomation is present
  if (sound.getNewData().updatedAmps) {
    res.send({ result: sound.getNewData().updatedAmps })
  }
})


const server = require('http').createServer(app);

module.exports = {
  server,
  app
};
