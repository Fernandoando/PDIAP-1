'use strict';

const mongoose = require('mongoose')
,	Schema = mongoose.Schema;

const AvaliadorSchema = new Schema({
	nome: {
		type: String
	},
	sobrenome: {
		type: String
	},
	email: {
		type: String
	},
	cpf: {
		type: String
	},
	telefone: {
		type: String
	},
	tamCamiseta: {
		type: String
	},
	outros: {
		type: String
	}
}, { collection: 'avaliadorCollection' });

const Avaliador = module.exports = mongoose.model('Avaliador', AvaliadorSchema);