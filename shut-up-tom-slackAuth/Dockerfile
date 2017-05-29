FROM node

ADD app.js          /app/app.js
ADD package.json    /app/package.json

WORKDIR /app

RUN npm install

EXPOSE 2020

CMD npm start
