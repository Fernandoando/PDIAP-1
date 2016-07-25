'use strict';

const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Avaliador = require('../controllers/avaliador-controller')
, session = require('express-session')
, AvaliadorSchema = require('../models/avaliador-schema');

router.get('/', function(req, res, next) {
  res.send('Avaliadores mt loucos nóis');
});

router.post('/registro', (req, res) => {

	let nome = req.body.nome
	,   sobrenome = req.body.sobrenome
  	,   email = req.body.email
  	,   cpf = req.body.cpf
  	,   telefone = req.body.telefone
  	,   tamCamiseta = req.body.tamCamiseta
  	,   outros = req.body.outros

	let newAvaliador = AvaliadorSchema({
		nome: nome,
		sobrenome: sobrenome,
		email: email,
		cpf: cpf,
		telefone: telefone,
		tamCamiseta: tamCamiseta,
		outros: outros
	});

	Avaliador.createAvaliador(newAvaliador, (callback) => {});
	res.redirect('/avaliadores');
});

module.exports = router;