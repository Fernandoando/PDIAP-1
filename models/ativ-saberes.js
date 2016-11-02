'use strict';

const mongoose = require('mongoose')
,	Schema = mongoose.Schema;

const AtivSaberesSchema = new Schema({
	nome: {
		type: String
	},
	responsavel: {
		type: String
	},
	cargaHoraria: {
		type: String
	},
	data: {
		type: String
	},
	local: {
		type: String
	}
}, { collection: 'AtivSaberesCollection' });

const ativSaberes = module.exports = mongoose.model('ativSaberes', AtivSaberesSchema);