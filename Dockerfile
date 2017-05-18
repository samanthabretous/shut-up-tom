FROM ubuntu:14.04
MAINTAINER Samantha Bretous <sam@samanthabretous.com>

# install system-wide deps for node
RUN apt-get -yqq update
RUN apt-get -yqq install nodejs npm
# symbolic link for the node binary to deal with backward compatibility issues
RUN ln -s /usr/bin/nodejs /usr/bin/node

# as separate steps (layers); copy package json; run npm install; copy all files(recursively) from the build context
RUN mkdir -p /usr/src/shut-up-tom-slack
WORKDIR /usr/src/shut-up-tom-slack
ONBUILD COPY package.json /usr/src/shut-up-tom-slack
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/shut-up-tom-slack

RUN mkdir -p /usr/src/shut-up-tom-time
WORKDIR /usr/src/shut-up-tom-time
ONBUILD COPY package.json /usr/src/shut-up-tom-time
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/shut-up-tom-time

RUN mkdir -p /usr/src/shut-up-tom-weather
WORKDIR /usr/src/shut-up-tom-weather
ONBUILD COPY package.json /usr/src/shut-up-tom-weather
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/shut-up-tom-weather

RUN mkdir -p /usr/src/shut-up-tom-sound
WORKDIR /usr/src/shut-up-tom-sound
ONBUILD COPY package.json /usr/src/shut-up-tom-sound
ONBUILD RUN npm install
ONBUILD COPY . /usr/src/shut-up-tom-sound

# tell the port number the container should expose
EXPOSE 2020

# run the command when container is started
CMD ["npm", "start"]
