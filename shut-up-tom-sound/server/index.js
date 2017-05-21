// const five = require("johnny-five");
// const board = new five.Board();
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

// board.on("ready", function() {
//   const sound = new five.Sensor({
//     pin: "A0",
//     freq: 250,
//     threshold: 5,
//   });
//   const led = new five.Led(3);
//   sound.on("data", (value) => {
//     console.log(value);
//     // if (sound.scaleTo(0, 10000) > 350) {
        //  sound.addResult(sound.scaleTo(0,10000))
//     //   led.on();
//     // }
//     // led.off();
//   })
// });

const server = require('http').createServer(app);

module.exports = {
  server,
  app
};
