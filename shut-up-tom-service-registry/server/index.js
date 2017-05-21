const path = require('path');
const express = require('express');
const applyMiddleware = require('./middleware');
const ServiceRegistry = require('./serviceRegistry');

const serviceRegistry = new ServiceRegistry();
const app = express();

app.set('serviceRegistry', serviceRegistry);
applyMiddleware(app);

// Handle socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./socket.js')(app, io, serviceRegistry);

app.put('/api/service/:intent/:port', (req, res, next) => {
  const { intent, port } = req.params;
  // '::' === IPv6 notation/ address and will require brackets around the address
  const serviceIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress;
  serviceRegistry.add(intent, serviceIp, port, io);
  res.json({ result: `${intent} at ${serviceIp}:${port}` });
});

// route where an application can find out infomation about another application location
app.get('/api/registry/:type', (req, res) => {
  const service = serviceRegistry.get(req.params.type);
  res.json(service);
});

// handles all the front end routing
const clientRoutes = require('./routes/clientRoutes')(serviceRegistry);
const slackRoutes = require('./routes/slackRoutes')(serviceRegistry);
app.use('/', clientRoutes);
app.use('/slack', slackRoutes);

module.exports = {
  server,
  app,
};
