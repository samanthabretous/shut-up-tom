// loads environment variables from a .env file
require('dotenv').config();
const express = require('express');
const request = require('request');

const app = express();

// require('skellington')({
//   slackToken: process.env.SLACK_TOKEN,
//   plugins: [require('../plugins/welcome')]
// });
// require('skellington')({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   port: 3000,
//   scopes: ['bot'],
//   plugins: [require('../plugins/welcome')],
// //   botkit: {
// //     interactive_replies: true,
// //     json_file_store: './db/'
// //   }
// });



const server = require('http').createServer(app);

module.exports = {
  server,
  app,
};
