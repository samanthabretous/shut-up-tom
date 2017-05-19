const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
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

app.get('*', (req, res) => {
  const clientRoutes = serviceRegistry.get('routes');
  const route = `http://${clientRoutes.ip}:${clientRoutes.port}`
  console.log(route);
  res.redirect(route)
})

module.exports = {
  server,
  app,
};
