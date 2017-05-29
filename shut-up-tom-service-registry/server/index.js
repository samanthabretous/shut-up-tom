const path = require('path');
const express = require('express');
const applyMiddleware = require('./middleware');
const ServiceRegistry = require('./serviceRegistry');
const proxy = require('./lib/proxy');
const restreamer = require('./lib/restreamer');
const url = require('url')

const serviceRegistry = new ServiceRegistry();
const app = express();

app.set('serviceRegistry', serviceRegistry);
applyMiddleware(app);

// Handle socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socket = require('./socket.js')(app, io, serviceRegistry);

// add new service to keep track of
app.put('/api/service/:intent/:port', (req, res, next) => {
  const { intent, port } = req.params;
  // '::' === IPv6 notation/ address and will require brackets around the address
  const serviceIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress;
  serviceRegistry.add(intent, serviceIp, port, io);
  const services = serviceRegistry.getAllServices();
  Object.keys(services).forEach(service => {
    console.log(service);
    let middleware = [];
    const { rootPath, intent, port, host, protocol } = services[service];
    console.log(intent);
    // if(middleware) {
    //   middleware = service.middleware.map(text => require(`./middleware/${text}`));
    // }
    // need to restream the request so that it can be proxied
    middleware.push(restreamer());
    app.use(`/api/${intent}*`, middleware, (req, res, next) => {
      console.log("original url",req.originalUrl);
      const newPath = url.parse(req.originalUrl).pathname.replace(`/api/${intent}`, rootPath);
      console.log(`Forwarding request to: ${newPath}`);
      console.log("target", `${protocol}://${host}:${port}/${newPath}`);
      proxy.web(req, res, { target: `${protocol}://${host}:${port}/${newPath}` }, next);
    });
    res.json({ result: `${intent} at ${serviceIp}:${port}` });
  })
});

// route where an application can find out infomation about another application location
app.get('/api/registry/:type', (req, res) => {
  const service = serviceRegistry.get(req.params.type);
  res.json(service);
});


module.exports = {
  server,
  app,
};
