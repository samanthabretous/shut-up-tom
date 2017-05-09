const express = require('express');
const path = require('path');
const debug = require('debug')('SERVER');

const app = express();

'use strict'

require('skellington')({
  slackToken: process.env.SLACK_TOKEN,
  plugins: [require('../plugins/welcome')]
});

// Handle socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./io.js')(app, io);

module.exports = server;
