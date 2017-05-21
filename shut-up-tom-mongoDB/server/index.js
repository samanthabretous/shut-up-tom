const express = require('express');
const app = express();
const request = require('superagent');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// middleware
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json());

// mongo initalization
mongoose.connect('mongodb://localhost/shut-up-tom');
const db = mongoose.connection;

// const models = require('./models');
const { sound, teamRoutes } = require('./routes');

app.use('/api/sound', soundRoutes);
app.use('/api/team', teamRoutes);


module.exports = { app, db };
