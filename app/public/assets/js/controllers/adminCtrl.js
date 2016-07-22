(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('adminCtrl', function($scope, $rootScope, $location, projetosAPI) {

		$scope.projeto = {};
		$scope.integrantes = [];
		$rootScope.header = '';

		projetosAPI.getProjeto()
		.success(function(projetos) {
			$scope.projeto = projetos;
			console.log(projetos);
			for (var i in projetos.integrantes){
				$scope.integrantes.push(projetos.integrantes[i]);
			}
			console.log(projetos.integrantes);
		});



	});
})();
