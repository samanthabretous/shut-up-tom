require('dotenv').config({path: '../../.env'})
const express = require('express');
const app = express();
const request = require('superagent');
const moment = require('moment');

// http://localhost:2020/service/time/3010
app.get('/service/:location', (req, res, next) => {
  request.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.location}&key=${process.env.GOOGLE_MAPS_GEOCODE}`, (err, response) => {
      if(err) {
          console.log(err);
          return res.sendStatus(500);
      }
      console.log(response.body);
      const location = response.body.results[0].geometry.location;
      const timestamp = +moment().format('X');

      request.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${timestamp}&key=${process.env.GOOGLE_MAPS_TIME}`, (err, response) => {
          if(err) {
              console.log(err);
              return res.sendStatus(500);
          }

          const result = response.body;

          const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');

          res.json({result: timeString});
      });
  });

});

module.exports = app;
