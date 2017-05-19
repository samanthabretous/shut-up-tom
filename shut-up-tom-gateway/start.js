const request = require('superagent');
const app = require('./server');
const http = require('http');

const server = http.createServer(app);
// this if statement will prevent our express server and test server
// (using supertest) from trying to access the same port at the same time
if (!module.parent) {
  server.listen(process.env.PORT || 2020);
  server.on('listening', () => console.log(`Listening on port ${server.address().port} in ${app.get('env')} mode`))
}
