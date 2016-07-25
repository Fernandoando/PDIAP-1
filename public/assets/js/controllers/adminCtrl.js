(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('adminCtrl', function($scope, $rootScope, $location, projetosAPI) {

		$scope.projeto = {};
		$scope.projeto1 = {};
		$scope.projeto2 = {};
		// $scope.projeto3 = {};
		// $scope.projeto4 = {};
		$scope.integrantes = [];
		$rootScope.header = '';

		projetosAPI.getProjeto()
		.success(function(projeto) {
			$scope.projeto = projeto;
			$scope.projeto1.nomeProjeto = projeto.nomeProjeto;
			$scope.projeto1.categoria = projeto.categoria;
			$scope.projeto1.eixo = projeto.eixo;
			$scope.projeto1.resumo = projeto.resumo;

			$scope.projeto2.nomeEscola = projeto.nomeEscola;
			$scope.projeto2.estado = projeto.estado;
			$scope.projeto2.cidade = projeto.cidade;
			$scope.projeto2.cep = projeto.cep;

			console.log($scope.projeto1);
			console.log($scope.projeto2);
			// for (var i in projetos.integrantes){
			// 	$scope.integrantes.push(projetos.integrantes[i]);
			// }
			// console.log(projetos.integrantes);
		});
	});
})();
