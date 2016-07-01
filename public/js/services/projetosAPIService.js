(function(){
	'use strict';

	angular
		.module('PDIAP')
		.factory("projetosAPI", function($http) {
			let _saveProjeto = function(projeto) {
				const request = {
					url: '/projetos/registro',
					method: 'POST',
					data: projeto
				}
				return $http(request);
			};

			let _postLogin = function(email,password) {
				const request = {
					url: '/projetos/login',
					method: 'POST',
					data: {
						email: email,
						password: password
					}
				}
				return $http(request);
			};

			let _getProjeto = function() {
				const request = {
					url: '/projetos/home',
					method: 'GET',
				}
				return $http(request);
			};

			let _getTodosProjetos = function() {
				const request = {
					url: '/projetos/todos',
					method: 'GET',
				}
				return $http(request);
			};

			return {
				saveProjeto: _saveProjeto,
				postLogin: _postLogin,
				getProjeto: _getProjeto,
				getTodosProjetos: _getTodosProjetos
			};
		});
})();