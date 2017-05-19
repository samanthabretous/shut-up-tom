const express = require('express');
const app = express();
const path = require('path');
const staticPath = path.join(__dirname, '../../shut-up-tom-electron/dist');
app.use(express.static(staticPath));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(staticPath, 'dashboard.html'));
});

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, '../../shut-up-tom-electron', '/add_to_slack.html'));
});

module.exports = app;
