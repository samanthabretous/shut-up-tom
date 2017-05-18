// loads environment variables from a .env file
require('dotenv').config();
const path = require('path');
const express = require('express');
const ServiceRegistry = require('./serviceRegistry');

const serviceRegistry = new ServiceRegistry();
const app = express();

app.set('serviceRegistry', serviceRegistry);

// Handle socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./socket.js')(app, io, serviceRegistry);

app.put('/service/:intent/:port', (req, res, next) => {
  const { intent, port } = req.params;
  // '::' === IPv6 notation/ address and will require brackets around the address
  const serviceIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress;
  serviceRegistry.add(intent, serviceIp, port, io);
  res.json({ result: `${intent} at ${serviceIp}:${port}` });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../shut-up-tom-electron', 'index.html'));
});

app.get('/auth', (req, res) =>{
  res.sendFile(path.join(__dirname, '../../shut-up-tom-electron', '/add_to_slack.html'))
})

module.exports = {
  server,
  app
};
