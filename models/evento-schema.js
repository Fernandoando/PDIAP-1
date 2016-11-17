'use strict';

const mongoose = require('mongoose')
,	Schema = mongoose.Schema;

const responsavelSchema = new Schema({
	 nome: {type: String}
	,cpf: {type: String}
});

const EventoSchema = new Schema({
	 tipo: {type: String}
	,titulo: {type: String}
	,cargaHoraria: {type: String}
	,responsavel: [responsavelSchema]
	,data: {type: String}
}, { collection: 'eventoCollection' });

const Evento = module.exports = mongoose.model('Evento', EventoSchema);
