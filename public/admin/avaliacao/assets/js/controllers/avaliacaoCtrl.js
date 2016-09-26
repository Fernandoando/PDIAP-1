(function(){
	'use strict';

	angular
	.module('PDIAPav')
	.controller('avaliacaoCtrl', function($scope, $rootScope, $q, $window, $mdDialog, avaliacaoAPI) {

		$scope.projetos = [];
		$scope.searchProject = "";

		let countTotal = 0;
		let nota1, nota2, nota3;
		$scope.hosp = [];
		let carregarProjetos = function() {
			avaliacaoAPI.getTodosProjetos()
			.success(function(projetos) {
				console.log(projetos);
				angular.forEach(projetos, function (value, key) {
					if (value.avaliacao !== undefined && value.avaliacao !== "") {
						nota1 = value.avaliacao.nota1;
						nota2 = value.avaliacao.nota2;
						if (value.avaliacao.nota3 !== undefined && value.avaliacao.nota3 !== "") {
							nota3 = value.avaliacao.nota3;
						}
					}

					let obj = ({
						_id: value._id,
						numInscricao: value.numInscricao,
						nomeProjeto: value.nomeProjeto,
						nomeEscola: value.nomeEscola,
						categoria: value.categoria,
						eixo: value.eixo,
						avaliado: value.avaliado,
						avaliacao: [100,90,99]
					});
					$scope.projetos.push(obj);
				});
			})
			.error(function(status) {
				console.log(status);
			});
		};
		$scope.carregarProjetos = carregarProjetos;

		// $scope.querySearch = function querySearch(query) {
		// 	let deferred = $q.defer();
		// 	return deferred;
		// }

		$scope.visualizarDetalhes = function(projeto,ev) {
			$mdDialog.show({
				controller: function dialogController($scope, $mdDialog, avaliacaoAPI) {
					$scope.details = projeto;
					$scope.desempate = false;
					$scope.habilitaDesempate = function() {
						$scope.desempate = !$scope.desempate;
					}
					$scope.addNotas = function(id,notas) {
						console.log(id);
						console.log(notas);
						avaliacaoAPI.putAvaliacao(id,notas)
						.success(function(data, status) {
							let showAlert = function(ev) {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer')))
									.clickOutsideToClose(false)
									.textContent('Projeto(s) atualizado(s) com sucesso!')
									.ok('OK')
									.targetEvent(ev)
								).then(function(result) {
									// $window.location.reload();
								}, function() {});
							};
							showAlert();
							console.log(status);
							console.log(data);
						})
						.error(function(status) {
							console.log('Error: '+status);
						});
					}
					$scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
				},
				templateUrl: 'admin/avaliacao/views/details.projetos.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false,
				fullscreen: true // Only for -xs, -sm breakpoints.
			});
		};



		$rootScope.ordenacao = ['categoria','eixo'];
		$rootScope.ordenarPor = function(campo) {
			$rootScope.ordenacao = campo;
		}

		$scope.query = 'nomeProjeto';
		$scope.setBusca = function(campo) {
			$scope.query = campo;
		}

		carregarProjetos();

	});
})();
