const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res){
  res.json({
    hello: 'world!'
  });
});

app.all('/api/v1/hello', function(req, res) {
  const response = {
    message: 'hello',
    query: req.query,
    body: req.body,
  };

  let gatewayMsg = req.headers['gateway-message'];
  if(gatewayMsg) {
    response['gateway-message'] = JSON.parse(gatewayMsg);
  }

  res.json(response);
});

const request = require('superagent');
const http = require('http');

const server = http.createServer(app);
server.listen();
server.on('listening', () => {
  console.log(`HelloAPI is listening on ${server.address().port} in ${app.get('env')} mode.`);

  const announce = () => {
    request.put(`http://192.168.99.100:2020/api/service/helloapi/${server.address().port}`, (err, res) => {
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

module.exports = app;
