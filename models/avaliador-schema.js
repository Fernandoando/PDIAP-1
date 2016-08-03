'use strict';

const mongoose = require('mongoose')
,	Schema = mongoose.Schema;

const AvaliadorSchema = new Schema({
	nome: {
		type: String
	},
	email: {
		type: String
	},
	cpf: {
		type: String
	},
	rg: {
		type: String
	},
	dtNasc: {
		type: String
	},
	nivelAcademico: {
		type: String
	},
	categoria: {
		type: String
	},
	eixo: {
		type: String
	},
	atuacaoProfissional: {
		type: String
	},
	tempoAtuacao: {
		type: String
	},
	telefone: {
		type: String
	},
	outros: {
		type: String
	}
}, { collection: 'avaliadorCollection' });

const Avaliador = module.exports = mongoose.model('Avaliador', AvaliadorSchema);