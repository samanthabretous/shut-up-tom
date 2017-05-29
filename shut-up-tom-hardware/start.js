const five = require("johnny-five");
const board = new five.Board();
const request = require('superagent');
board.on("ready", () => {

  const envelope = new five.Sensor({
    pin: "A0",
    freq: 250,
    threshold: 4,
  });

  envelope.on("change", (value) => {
    console.log("value env", value);
    request.post('http://localhost:2020/sound/new-data')
    .send({ deviceName: 'tommy', teamId: 'T4Z5PF3TP', sound: value })
    .then((success, failure) => {
      console.log(success.body);
    })
  });
});
