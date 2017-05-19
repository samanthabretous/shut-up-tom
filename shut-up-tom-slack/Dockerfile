FROM node:boron
MAINTAINER Samantha Bretous <sam@samanthabretous.com>

# install system-wide deps for node
# RUN apt-get -yqq update
# RUN apt-get -yqq install nodejs npm
# symbolic link for the node binary to deal with backward compatibility issues
# RUN ln -s /usr/bin/nodejs /usr/bin/node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

# tell the port number the container should expose
EXPOSE 2020

# run the command when container is started
CMD ["npm", "start"]
