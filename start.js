const server = require('./server');

// this if statement will prevent our express server and test server
// (using supertest) from trying to access the same port at the same time
if (!module.parent) {
  server.listen(process.env.PORT || 2020, () => console.log('Listening on port 2020'));
}

module.exports = server;
