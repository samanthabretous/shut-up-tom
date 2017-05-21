const request = require('superagent');
const { app, db } = require('./server');
const http = require('http');

const server = http.createServer(app);
// the port that is normal passed through to the listen function is dynamically created by our main node application.
db.on('open', () => {
  server.listen(/* dynamically created port*/);
});

server.on('listening', () => {
  console.log(`Shut Up Tom Mongo DB is listening on ${server.address().port} in ${app.get('env')} mode.`);

  const announce = () => {
    request.put(`http://127.0.0.1:2020/api/service/mongo/${server.address().port}`, (err, res) => {
      if (err) {
        console.log(err);
        console.log('Error connecting to Shut Up Tom Mongo DB');
        return;
      }
      console.log(res.body);
    })
  }
  announce();
  setInterval(announce, 15*1000) // 15 seconds
});
