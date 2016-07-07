const mongoose = require('mongoose')
,	bcrypt = require('bcryptjs')
,	Schema = mongoose.Schema;

const SaberesSchema = new Schema({
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
}, { collection: 'saberesCollection' });

const Saberes = module.exports = mongoose.model('Saberes', SaberesSchema);