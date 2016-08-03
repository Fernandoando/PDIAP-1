'use strict';

const express = require('express')
, router = express.Router()
, passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, Avaliador = require('../controllers/avaliador-controller')
, session = require('express-session')
, AvaliadorSchema = require('../models/avaliador-schema');

function splita(arg){
  if (arg !== undefined) {
    let data = arg.replace(/([-.() ])/g,'');
    return data;
  }
}

router.get('/', function(req, res, next) {
  res.send('Avaliadores mt loucos nóis');
});

router.post('/registro', (req, res) => {
	let newAvaliador = AvaliadorSchema({
		nome: req.body.nome,
		email: req.body.email,
		cpf: splita(req.body.cpf),
		rg: splita(req.body.rg),
		dtNasc: req.body.dtNasc,
		nivelAcademico: req.body.nivelAcademico,
		categoria: req.body.categoria,
		eixo: req.body.eixo,
		atuacaoProfissional: req.body.atuacaoProfissional,
		tempoAtuacao: req.body.tempoAtuacao,
		telefone: splita(req.body.telefone),
		outros: req.body.outros
	});

	Avaliador.createAvaliador(newAvaliador, (callback) => {});
	res.redirect('/avaliadores');
});

module.exports = router;