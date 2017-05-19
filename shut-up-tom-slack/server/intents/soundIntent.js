const request = require('superagent');

module.exports.process = function process(intentData, cb) {
  request.get(`http://localhost:2020/registry/sound`, (err, res) => {
    if(err || res.statusCode !== 200) {
      console.log(err);
      return cb(false, 'No service available');
    }
    if (intentData.intent[0].value !== 'sound') {
      return cb(new Error(`Expected sound event but got ${intentData.intent[0].value}`));
    }

    request.get(`http://${res.body.ip}:${res.body.port}/service`, (err, res) => {
      if(err || res.statusCode !== 200 || !res.body.result) {
        console.log(err);
        return cb(false, `I had a problem hearing how loud it is in the room`)
      }
      return cb(false, `It is ${res.body.result} loud`);
    });
  });
};
