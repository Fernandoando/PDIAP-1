(function(){
	'use strict';

	angular
		.module('PDIAP')
		.run(function($rootScope, $http, $state) {
		   	// Função logout está disponível em todas as páginas
		   	$rootScope.logout = function() {
		   		$http.post('/admin/logout');
		   		$rootScope.logado = false;
					$state.go('admin');
		   	};
		});
})();
