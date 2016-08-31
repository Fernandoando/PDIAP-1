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

		let _getTodosProjetos = function() {
			const request = {
				url: '/dados/projetos300816.json',
				method: 'GET',
			}
			return $http(request);
		};

		let _putTodosProjetos = function(projeto) {
			const request = {
				url: '/admin/upgreice',
				method: 'PUT',
				data: projeto
			}
			return $http(request);
		};

		return {
			postLoginAdmin: _postLoginAdmin,
			getTodosProjetos: _getTodosProjetos,
			putTodosProjetos: _putTodosProjetos
		};
	});
})();
