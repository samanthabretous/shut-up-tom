// loads environment variables from a .env file
require('dotenv').config();
const express = require('express');
const request = require('request');

const app = express();
app.get('/service/:intent/:port', (req, res, next) => {
  const { intent, port } = req.params;
  console.log(intent, port);
  // '::' === IPv6 notation/ address and will require brackets around the address
  const serviceIp = req.connection.remoteAddress.includes('::')
    ? `[${req.connection.remoteAddress}]`
    : req.connection.remoteAddress;
  res.json({ result: `${intent} at ${serviceIp}:${port}` });
});

const server = require('http').createServer(app);

module.exports = {
  server,
  app,
};
