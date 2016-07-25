(function(){
	'use strict';

	angular
		.module('PDIAP')
		.run(function($rootScope, $http, $location) {
		   	// Função logout está disponível em todas as páginas
		   	$rootScope.logout = function() {
		   		$http.post('/projetos/logout');
		   		localStorage.removeItem('token');
		   		$rootScope.logado = false;
		  		$location.url('/login');
		   	};
		});
})();
