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

		return {
			postLoginAdmin: _postLoginAdmin,
			getTodosProjetos: _getTodosProjetos,
			getTodosSaberes: _getTodosSaberes,
			getTodosAvaliadores: _getTodosAvaliadores,
			putSetAprovados: _putSetAprovados,
			putUnsetAprovados: _putUnsetAprovados,
			postConfirmacao: _postConfirmacao
		};
	});
})();
