FROM node
MAINTAINER Samantha Bretous <sam@samanthabretous.com>

ADD start.js        /app/start.js
ADD server/         /app/server
ADD package.json    /app/package.json

WORKDIR /app

RUN npm install

EXPOSE 2022

CMD npm start
