const mongoose = require('mongoose')
,	bcrypt = require('bcryptjs')
,	uniqueValidator = require('mongoose-unique-validator');

/*
// User Schema
const ProjetoSchema = mongoose.Schema({
	username: {
		type: String, index: true, unique: 'Username já existe.'
	},
	password: {
		type: String, required: true
	},
	email: {
		type: String, required: true, unique: 'Email já existe.', uniqueCaseInsensitive: true
	},
	name: {
		type: String
	}
//pra adicionar aqui é molezinha
//lembrando que ainda não tem nada de atomic design (por enquanto)
}, { collection: 'projetosAPIteste' });

ProjetoSchema.plugin(uniqueValidator);

const Projeto = module.exports = mongoose.model('Projeto', ProjetoSchema);
*/

const Schema = mongoose.Schema;

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

// Novo SCHEMA
// Documento projetos
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
		type: String, required: true, unique: 'Email já existe.', uniqueCaseInsensitive: true
	},
	password: {
		type: String, required: true
	},

	integrantes: [IntegranteSchema]
	/*orientador1: [{
		nomeOrientador1: {
			type: String
		},
		emailOrientador1: {
			type: String
		},
		cpfOrientador1: {
			type: Number
		},
		telefoneOrientador1: {
			type: Number
		},
		tamCamisetaOrientador1: {
			type: String
		}
	}],

	orientador2: [{
		nomeOrientador2: {
			type: String
		},
		emailOrientador2: {
			type: String
		},
		cpfOrientador2: {
			type: Number
		},
		telefoneOrientador2: {
			type: Number
		},
		tamCamisetaOrientador2: {
			type: String
		}
	}],

	aluno1: [{
		nomeAluno1: {
			type: String
		},
		emailAluno1: {
			type: String
		},
		cpfAluno1: {
			type: Number
		},
		telefoneAluno1: {
			type: Number
		},
		tamCamisetaAluno1: {
			type: String
		}
	}],

	aluno2: [{
		nomeAluno2: {
			type: String
		},
		emailAluno2: {
			type: String
		},
		cpfAluno2: {
			type: Number
		},
		telefoneAluno2: {
			type: Number
		},
		tamCamisetaAluno2: {
			type: String
		}
	}],

	aluno3: [{
		nomeAluno3: {
			type: String
		},
		emailAluno3: {
			type: String
		},
		cpfAluno3: {
			type: Number
		},
		telefoneAluno3: {
			type: Number
		},
		tamCamisetaAluno3: {
			type: String
		}
	}]*/

}, { collection: 'betaPorcaoAPI' })

ProjetoSchema.plugin(uniqueValidator);

const Projeto = module.exports = mongoose.model('Projeto', ProjetoSchema);