'use strict';

const express = require('express');
const app = express();
const request = require('superagent');

app.get('/service/:location', (req, res, next) => {

    request.get(`http://api.openweathermap.org/data/2.5/weather?q=
    ${req.params.location}&APPID=${process.env.OPEN_WEATHER}&units=metric`,
    (err, response) => {

        if (err) {
            console.log(err);
            return res.sendStatus(404);
        }

        res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});

    });
});

module.exports = app;
