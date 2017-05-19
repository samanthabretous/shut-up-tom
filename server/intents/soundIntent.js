const request = require('superagent');

module.exports.process = function process(intentData, registry, cb) {
  if (intentData.intent[0].value !== 'sound') {
    return cb(new Error(`Expected sound event but got ${intentData.intent[0].value}`));
  }

  const service = registry.get('sound');
  if (!service) return cb(false, 'No service available');

  request.get(`http://${service.ip}:${service.port}/service`, (err, res) => {
    if(err || res.statusCode !== 200 || !res.body.result) {
      console.log(err);
      return cb(false, `I had a problem hearing how loud it is in the room`)
    }
    return cb(false, `It is ${res.body.result} loud`);
  });
};
