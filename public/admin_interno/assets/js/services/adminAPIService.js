(function(){
	'use strict';

	angular
	.module('PDIAP')
	.factory("adminAPI", function($http) {
		let _postLoginAdmin = function(username) {
			const request = {
				url: '/admin/login',
				method: 'POST',
				data: username
			}
			return $http(request);
		};

		let _getTodosProjetos = function() {
			const request = {
				url: '/admin/home',
				method: 'GET',
			}
			return $http(request);
		};

		return {
			getTodosProjetos: _getTodosProjetos,
			postLoginAdmin: _postLoginAdmin
		};
	});
})();
