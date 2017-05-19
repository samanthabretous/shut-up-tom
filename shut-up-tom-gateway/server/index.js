const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const url = require('url')
const logger = require('morgan');
const services = require('./services.json');
const proxy = require('../lib/proxy');
const restreamer = require('../lib/restreamer');

const app = express();

// set up the app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Bootstrap services
for(let i = 0; i < services.length; i++) {
  console.log(services);
  const name = services[i].name;
  const host = services[i].host;
  const port = services[i].port;
  const rootPath = services[i].rootPath || "";
  const protocol = services[i].protocol || "http";

  console.log(`Boostrapping service: ${protocol}://${host}:${port}/${rootPath}`);

  let middleware = [];
  console.log(middleware);
  if(services[i].middleware) {
    middleware = services[i].middleware.map(text => require(`../middleware/${text}`));
  }
  console.log(middleware);
  // need to restream the request so that it can be proxied
  middleware.push(restreamer());

  app.use(`/api/${name}*`, middleware, (req, res, next) => {
    console.log("name", name);
    console.log("original", req.originalUrl);
    const newPath = url.parse(req.originalUrl).pathname.replace(`/api/${name}`, rootPath);
    console.log(`Forwarding request to: ${newPath}`);
    console.log("target", `${protocol}://${host}:${port}/${newPath}`);
    proxy.web(req, res, { target: `${protocol}://${host}:${port}/${newPath}` }, next);
  });
}

app.get('/', (req, res) => {
  res.json({
    message: "API Gateway is alive."
  });
});

module.exports = app;



// const staticPath = path.join(__dirname, '../../shut-up-tom-electron/dist');
// app.use(express.static(staticPath));
//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(staticPath, 'index.html'));
// });
//
// app.get('/dashboard', (req, res) => {
//   res.sendFile(path.join(staticPath, 'dashboard.html'));
// });
//
// app.get('/auth', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../shut-up-tom-electron', '/add_to_slack.html'));
// });
