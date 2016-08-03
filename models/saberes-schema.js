'use strict';

const mongoose = require('mongoose')
,	Schema = mongoose.Schema;

const SaberesSchema = new Schema({
	nome: {
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
	escola: {
		type: String
	}
}, { collection: 'saberesCollection' });

const Saberes = module.exports = mongoose.model('Saberes', SaberesSchema);