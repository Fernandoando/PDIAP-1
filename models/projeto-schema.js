const mongoose = require('mongoose')
,	bcrypt = require('bcryptjs')
,	Schema = mongoose.Schema;

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
		type: Number
	},
	telefone: {
		type: Number
	},
	tamCamiseta: {
		type: String
	}
});

const ProjetoSchema = new Schema({
	nomeProjeto: {
		type: String
	},
	tipo: {
		type: String
	},
	categoria: {
		type: String
	},
	eixo: {
		type: String
	},


	nomeEscola: {
		type: String
	},
	cep: {
		type: Number
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

ProjetoSchema.methods.hasExpired= function(){
    let now = new Date().now;
    return (now - ProjetoSchema.resetPasswordCreatedDate) > 1; //token is a week old
};

const Projeto = module.exports = mongoose.model('Projeto', ProjetoSchema);