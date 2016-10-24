'use strict';

const mongoose = require('mongoose')
,	Schema = mongoose.Schema;

const ParticipanteSchema = new Schema({
	nome: {type: String},
	cpf: {type: String},
	email: {type: String}
});

const OficinaSchema = new Schema({
	nome: {type: String},
	cargaHoraria: {type: String},
	responsavel: {type: String},
	data: {type: String},
	local: {type: String},
	participantes: ParticipanteSchema
}, { collection: 'oficinaCollection' });

const Oficina = module.exports = mongoose.model('Oficina', OficinaSchema);