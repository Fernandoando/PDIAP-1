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
		dtNascimento: req.body.dtNascimento,
		nivelAcademico: req.body.nivelAcademico,
		categoria: req.body.categoria,
		eixo: req.body.eixo,
		atuacaoProfissional: req.body.atuacaoProfissional,
		tempoAtuacao: req.body.tempoAtuacao,
		telefone: splita(req.body.telefone),
		curriculo: req.body.curriculo,
		turnos: req.body.turnos
	});

	Avaliador.createAvaliador(newAvaliador, (callback) => {});
	res.send('success');
});

module.exports = router;
