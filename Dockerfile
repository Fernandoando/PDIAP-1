FROM node:latest

RUN mkdir /src

COPY . /src

WORKDIR /src

RUN npm install nodemon -g
RUN npm install bower -g

#COPY . /src
#WORKDIR /src
##ADD app/package.json /src/package.json
##ADD app/bower.json /src/bower.json
##ADD app/.bowerrc /src/.bowerrc
RUN npm install
RUN bower install --allow-root

#ADD app/nodemon.json /src/nodemon.json

EXPOSE 3000

#CMD ["bash"]
CMD npm start