'use strict';

const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Saberes = require('../controllers/saberes-controller')
, session = require('express-session')
, SaberesSchema = require('../models/saberes-schema');

function splita(arg){
  if (arg !== undefined) {
    let data = arg.replace(/([-.() ])/g,'');
    return data;
  }
}

router.get('/', function(req, res, next) {
  res.send('Saberes Docentes mt loucos nóis');
});

router.post('/registro', (req, res) => {

	let newSaberes = SaberesSchema({
		nome: req.body.nome,
		email: req.body.email,
		cpf: splita(req.body.cpf),
		telefone: splita(req.body.telefone),
		escola: req.body.escola
	});

	Saberes.createSaberes(newSaberes, (callback) => {});
	res.redirect('/saberes-docentes');
});

module.exports = router;