var five = require("johnny-five");
var board = new five.Board();
const express = require('express');
const app = express();

board.on("ready", function() {
  const sound = new five.Sensor({
    pin: "A0",
    freq: 250,
    threshold: 5,
  });
  const led = new five.Led(3);
  sound.on("data", (value) => {
    console.log(value);
    // if (sound.scaleTo(0, 10000) > 350) {
    //   led.on();
    // }
    // led.off();
  })
  app.get('/service/:sound', (req, res, next) => {
    res.send()
  });
});

module.exports = app;
