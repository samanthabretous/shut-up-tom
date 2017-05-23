const five = require("johnny-five");
const board = new five.Board();
const request = require('superagent');

board.on("ready", () => {
  console.log(board.id);
  const sound = new five.Sensor({
    pin: "A0",
    freq: 250,
    threshold: 2,
  });
  const sound2 = new five.Sensor({
    pin: "2",
    freq: 250,
    threshold: 5
  })
  const led = new five.Led(3);
  sound.on("change", (value) => {
    console.log("sound 1 value",value);
    // if (sound.scaleTo(0, 10000) > 350) {
      request.post('http://localhost:2020/sound/new-data')
      .send({ value })
        //  sound.addResult(sound.scaleTo(0,10000))
    //   led.on();
    // }
    // led.off();
  })
  sound2.on("change", value => {
    console.log("2", value);
  })
  // board.pinMode(2, board.io.MODES.INPUT);
  // board.digitalRead(2, function(value) {
  //   console.log("sound3", value);
  //   if (value === board.io.LOW) {
  //     doSomethingOnLow();
  //   }
  // });
});
