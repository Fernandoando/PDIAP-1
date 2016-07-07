'use strict';

const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Saberes = require('../controllers/saberes-controller')
, session = require('express-session')
, SaberesSchema = require('../models/saberes-schema');

router.get('/', function(req, res, next) {
  res.send('Saberes Docentes mt loucos nóis');
});

router.post('/registro', (req, res) => {

	let nome = req.body.nome
	,   sobrenome = req.body.sobrenome
  	,   email = req.body.email
  	,   cpf = req.body.cpf
  	,   telefone = req.body.telefone
  	,   tamCamiseta = req.body.tamCamiseta
  	,   outros = req.body.outros

	let newSaberes = SaberesSchema({
		nome: nome,
		sobrenome: sobrenome,
		email: email,
		cpf: cpf,
		telefone: telefone,
		tamCamiseta: tamCamiseta,
		outros: outros
	});

	Saberes.createSaberes(newSaberes, (callback) => {});
	res.redirect('/saberes-docentes');
});

module.exports = router;