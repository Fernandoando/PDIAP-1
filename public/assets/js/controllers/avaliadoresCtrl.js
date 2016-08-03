(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('avaliadoresCtrl', function($scope, $location, projetosAPI) {

		$scope.eixos = [];

		projetosAPI.getCategorias()
		.success(function(data) {
			$scope.listaCategorias = data.categorias;
			console.log($scope.listaCategorias);
		})
		.error(function(status) {
			console.log(status);
		});

		$scope.selectEixos = function(cat) {
			angular.forEach($scope.listaCategorias, function (value, key){
				//verifica a categoria selecionada
				if(cat === value.categoria){
					$scope.eixos = [];
					//adiciona os eixos em $scope.eixos
					for (var i in value.eixos) {
						$scope.eixos.push(value.eixos[i]);
					}
				}
			});
		};

		$scope.registrarAvaliadores = function(avaliador) {
			projetosAPI.saveProjeto(avaliador)
			.success(function(avaliador, status) {
				console.log(projeto);
				if (status === 202) {
					$scope.emailDuplicado = true;
					$scope.projetoForm.email.$setValidity('duplicado',false);
					console.log('email duplicado: '+$scope.emailDuplicado);
				} else if (projeto !== 'error') {
					$scope.registro = true;
					$scope.msg = 'Registrado com sucesso!';
					//$location.url('/inscricao');
					resetForm();
				} else {
					$scope.registro = false;
					$scope.msg = 'Erro ao registrar projeto.';
					//$location.url('/inscricao');
				}
			})
			.error(function(status) {
				$scope.registro = false;
				$scope.msg = 'Erro ao registrar projeto.';
				console.log(status);
				//$location.url('/inscricao');
			});
			console.log(projeto);
		};
	});
})();
