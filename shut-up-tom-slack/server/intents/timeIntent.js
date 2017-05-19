const request = require('superagent');

module.exports.process = function process(intentData, cb) {
  request.get(`http://localhost:2020/registry/time`, (err, res) => {
    if(err || res.statusCode !== 200) {
      console.log(err);
      return cb(false, 'No service available');
    }
    if (intentData.intent[0].value !== 'time') {
      return cb(new Error(`Expected time event but got ${intentData.intent[0].value}`));
    }

    if (!intentData.location) {
      return cb(new Error('Missing location and time intent'));
    }
    const location = intentData.location[0].value.replace(/,.?iris/i, '');
    request.get(`http://${res.body.ip}:${res.body.port}/service/${location}`, (err, res) => {
      if(err || res.statusCode !== 200 || !res.body.result) {
        console.log(err);
        return cb(false, `I had a problem finding the time in ${location}`)
      }
      return cb(false, `In ${location} it is now ${res.body.result}`);
    });
  })
};
