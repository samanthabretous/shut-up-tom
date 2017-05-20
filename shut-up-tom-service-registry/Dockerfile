FROM node
MAINTAINER Samantha Bretous <sam@samanthabretous.com>

# Create app directory
ADD start.js        /app/start.js
ADD server/         /app/server
ADD package.json    /app/package.json

WORKDIR /app

# Install app dependencies
RUN npm install

# tell the port number the container should expose
EXPOSE 2020

# run the command when container is started
CMD ["npm", "start"]
