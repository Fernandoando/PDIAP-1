'use strict';

const mongoose = require('mongoose')
,	bcrypt = require('bcryptjs')
,	autoIncrement = require('mongoose-auto-increment')
,	Schema = mongoose.Schema;

var connection = mongoose.createConnection("mongodb://localhost/loginapp");
// var connection = mongoose.createConnection("mongodb://localhost:27017/loginapp");
//var connection = mongoose.createConnection("mongodb://172.17.0.2:27017/loginapp");

autoIncrement.initialize(connection);

const IntegranteSchema = new Schema({
	tipo: {
		type: String
	},
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
	tamCamiseta: {
		type: String
	}
});

const ProjetoSchema = new Schema({
	numInscricao: {
		type: Schema.Types.ObjectId
	},
	nomeProjeto: {
		type: String
	},
	categoria: {
		type: String
	},
	eixo: {
		type: String
	},
	hospedagem: {
		type: String
	},

	nomeEscola: {
		type: String
	},
	cep: {
		type: String
	},
	cidade: {
		type: String
	},
	estado: {
		type: String
	},



	resumo: {
		type: String
	},

	email: {
		type: String, required: true, unique: true, uniqueCaseInsensitive: true
	},
	password: {
		type: String, required: true
	},
	aprovado: {
		type: String
	},


	resetPasswordToken: {type: String},
    resetPasswordCreatedDate: {type: Date},


	integrantes: [IntegranteSchema]

}, { collection: 'betaPorcaoAPI' });

ProjetoSchema.methods.hasExpired = function(){
    let now = new Date().now;
    return (now - ProjetoSchema.resetPasswordCreatedDate) > 1; //token is a week old
};

ProjetoSchema.plugin(autoIncrement.plugin, {model: 'Projeto', field: 'numInscricao'});

const Projeto = module.exports = mongoose.model('Projeto', ProjetoSchema);
