// const five = require("johnny-five");
// const board = new five.Board();
const express = require('express');
const SoundResults = require('./soundResults');

const app = express();
const sound = new SoundResults();

setInterval(() => sound.addResult(sound.getLastResult() + 10), 10000);

app.get('/service', (req, res, next) => {
  res.send({ result: sound.getLastResult() })
});

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

// Handle socket.io
const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// require('./socket.js')(app, io);

module.exports = {
  server,
  app
};
