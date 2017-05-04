FROM node:7.4

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app

COPY package.json $HOME/pdiap/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/pdiap
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY . $HOME/pdiap
RUN chown -R app:app $HOME/* && npm install nodemon pm2 bower -g --silent --progress=false && bower install --allow-root
USER app