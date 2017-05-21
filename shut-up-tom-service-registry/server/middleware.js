const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs  = require('express-handlebars');
const path = require('path');
const logger = require('morgan');


module.exports = (app) => {
  const clientFolderPath = path.join(__dirname, '../../shut-up-tom-electron');
  app.use(express.static(path.join(clientFolderPath, 'dist')));

  // body-parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // cookie parser
  app.use(cookieParser())

  app.use(logger('dev'));

  // handlebars
  app.set('views', path.join(clientFolderPath, 'views'));
  // Create `ExpressHandlebars` instance with a default layout.
  const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(clientFolderPath, '/views/layouts/'),
    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
      path.join(clientFolderPath, '/views/partials/')
    ]
  });
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
};
