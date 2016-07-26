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
		type: Number
	},
	telefone: {
		type: Number
	},
	tamCamiseta: {
		type: String
	},
	outros: {
		type: String
	}
}, { collection: 'avaliadorCollection' });

const Avaliador = module.exports = mongoose.model('Avaliador', AvaliadorSchema);