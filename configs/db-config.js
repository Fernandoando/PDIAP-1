'use strict';

const mongoose = require('mongoose')
,	dbURL = 'mongodb://localhost/loginapp';

mongoose.connect(dbURL);

mongoose.connection.on('connected', () => {
  console.log('<<Mongoose>> conectou em: ' + dbURL);
});
mongoose.connection.on('error', (err) => {
  console.log('<<Mongoose>> erro ao conectar: ' + err);
});
mongoose.connection.on('disconnected', () => {
  console.log('<<Mongoose>> desconectou.');
});
mongoose.connection.on('open', () => {
  console.log('<<Mongoose>> conexão aberta.');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('<<Mongoose>> conexão terminada.');
    process.exit(0);
  });
});