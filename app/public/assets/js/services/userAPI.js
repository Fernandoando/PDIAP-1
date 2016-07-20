(function(){
	'use strict';

	angular
		.module('PDIAP')
		.factory('userAPI', userAPI);

	userAPI.$inject = ['$http'];	

	function userAPI($http) {
		let _login = function() {
			const url = '/users/projeto';
			const request = {
				url: url,
				method: 'GET'
			}
			return $http(request);

				  // $http.get('http://localhost:3000/contatos');
		}
		return {
			login:_login
		}
	}	
})();