FROM node:latest

RUN mkdir /src

RUN npm install nodemon -g
RUN npm install bower -g

WORKDIR /src
ADD app/package.json /src/package.json
RUN npm install
RUN bower install

ADD app/nodemon.json /src/nodemon.json

EXPOSE 3000

CMD npm start
