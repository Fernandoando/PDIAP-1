(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.factory("adminAPI", function($http) {
		let _postLoginAdmin = function(username,password) {
			const request = {
				url: '/admin/login',
				method: 'POST',
				data: {
					username: username,
					password: password
				}
			}
			return $http(request);
		};

		// let _getTodosProjetos = function() {
		// 	const request = {
		// 		url: '/dados/projetos300816.json',
		// 		method: 'GET',
		// 	}
		// 	return $http(request);
		// };

		let _getTodosProjetos = function() {
			const request = {
				url: '/admin/projetos',
				method: 'GET',
			}
			return $http(request);
		};

		let _getTodosSaberes = function() {
			const request = {
				url: '/admin/saberes',
				method: 'POST',
			}
			return $http(request);
		};

		let _getTodosAvaliadores = function() {
			const request = {
				url: '/admin/avaliador',
				method: 'POST',
			}
			return $http(request);
		};

		let _putSetAprovados = function(projeto) {
			const request = {
				url: '/admin/upgreice',
				method: 'PUT',
				data: projeto
			}
			return $http(request);
		};

		let _putUnsetAprovados = function(projeto) {
			const request = {
				url: '/admin/upgreice2',
				method: 'PUT',
				data: projeto
			}
			return $http(request);
		};

		let _postConfirmacao = function(idProjeto,situacao) {
			const request = {
				url: '/projetos/confirma/'+idProjeto+'/'+situacao,
				method: 'POST'
			}
			return $http(request);
		};

		let _getEscolasSaberes = function() {
			const request = {
				url: '/saberes-docentes/registro',
				method: 'GET',
			}
			return $http(request);
		};

		let _saveSaberesDocentes = function(saberes) {
			const request = {
				url: '/saberes-docentes/registro',
				method: 'POST',
				data: saberes
			}
			return $http(request);
		};

		let _saveAvaliador = function(avaliador) {
			const request = {
				url: '/avaliadores/registro',
				method: 'POST',
				data: avaliador
			}
			return $http(request);
		};

		let _putPresencaProjetos = function(arrayIntegrantesPresentes,arrayIntegrantesAusentes) {
			const request = {
				url: '/admin/setPresencaProjetos',
				method: 'PUT',
				data: {
					integrantesPresentes: arrayIntegrantesPresentes,
					integrantesAusentes: arrayIntegrantesAusentes
				}
			}
			return $http(request);
		};

		return {
			postLoginAdmin: _postLoginAdmin,
			getTodosProjetos: _getTodosProjetos,
			getTodosSaberes: _getTodosSaberes,
			getTodosAvaliadores: _getTodosAvaliadores,
			putSetAprovados: _putSetAprovados,
			putUnsetAprovados: _putUnsetAprovados,
			postConfirmacao: _postConfirmacao,
			getEscolasSaberes: _getEscolasSaberes,
			saveSaberesDocentes: _saveSaberesDocentes,
			saveAvaliador: _saveAvaliador,
			putPresencaProjetos: _putPresencaProjetos
		};
	});
})();
