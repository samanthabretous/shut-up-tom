const request = require('superagent');
const service = require('./server');
const http = require('http');

const server = http.createServer(service);
// the port that is normal passed through to the listen function is dynamically created by our main node application.
server.listen(/* dynamically created port*/);

server.on('listening', () => {
  console.log(`Routes is listening on ${server.address().port} in ${service.get('env')} mode.`);

  const announce = () => {
    request.put(`http://127.0.0.1:2020/service/routes/${server.address().port}`, (err, res) => {
      if (err) {
        console.log(err);
        console.log('Error connecting to Shut Up Tom Routes');
        return;
      }
      console.log(res.body);
    })
  }
  announce();
  setInterval(announce, 15*1000)
});
