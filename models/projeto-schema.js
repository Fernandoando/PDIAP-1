const mongoose = require('mongoose')
,	bcrypt = require('bcryptjs')
,	uniqueValidator = require('mongoose-unique-validator')
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

	integrantes: [IntegranteSchema]
	
}, { collection: 'betaPorcaoAPI' })

//ProjetoSchema.plugin(uniqueValidator);
const Projeto = module.exports = mongoose.model('Projeto', ProjetoSchema);
//const Integrante = module.exports = mongoose.model('IntegranteSchema', IntegranteSchema);
