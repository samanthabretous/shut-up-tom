// loads environment variables from a .env file
require('dotenv').config();
const express = require('express');
const request = require('request');

const app = express();

const server = require('http').createServer(app);

module.exports = {
  server,
  app,
};
