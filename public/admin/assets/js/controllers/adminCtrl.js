(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('adminCtrl', function($scope, $q, $window, $mdDialog, adminAPI) {

		$scope.projetos = [];
		$scope.searchProject = "";
		$scope.idAprovados = [];

		let countTotal = 0;
		$scope.hosp = [];
		let carregarProjetos = function() {
			adminAPI.getTodosProjetos()
			.success(function(projetos) {
				console.log(projetos);
				angular.forEach(projetos, function (value, key) {
					let obj = ({
						_id: value._id,
						numInscricao: value.numInscricao,
						nomeProjeto: value.nomeProjeto,
						nomeEscola: value.nomeEscola,
						categoria: value.categoria,
						eixo: value.eixo,
						aprovado: value.aprovado
					});
					$scope.projetos.push(obj);
					console.log(obj);
				});

				// angular.forEach($scope.projetos, function (value, key){
				// if(value.categoria === 'Ensino Médio, Técnico e Superior'){
				// 	if (value.eixo !== 'Ciências Agrárias, Exatas e da Terra'
				// 	&& value.eixo !== 'Ciências Ambientais, Biológicas e da Saúde'
				// 	&& value.eixo !== 'Ciências Humanas e Sociais Aplicadas'
				// 	&& value.eixo !== 'Extensão'
				// 	&& value.eixo !== 'Línguas e Artes'
				// 	&& value.eixo !== 'Ciências da Computação'
				// 	&& value.eixo !== 'Engenharias') {
				// 		console.log(value.eixo);
				// 	}
				//
				//
				// }
				// if (value.hospedagem !== undefined && value.hospedagem !== "") {
				// 	console.log(value.hospedagem);
				// 	$scope.hosp.push(value.hospedagem);
				// }
				// countTotal++;
				// console.log(value.eixo);
				// });
				// console.log(countTotal);
			})
			.error(function(status) {
				console.log(status);
			});
		};
		$scope.carregarProjetos = carregarProjetos;

		$scope.querySearch = function querySearch (query) {
			let deferred = $q.defer();
			return deferred;
		}

		$scope.count = 0;
		$scope.contador = function(check,idProj) {
			if (check) {
				$scope.count--;
				let index = $scope.idAprovados.indexOf(idProj);
				$scope.idAprovados.splice(index, 1);
			}
			else {
				$scope.count++;
				$scope.idAprovados.push(idProj);
			}
			console.log($scope.idAprovados);
		}

		$scope.update = function() {
			let ids = $scope.idAprovados;
			adminAPI.putSetAprovados(ids)
			.success(function(data, status) {
				$scope.selectedo = false;
				let showAlert = function(ev) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.textContent('Projeto(s) atualizado(s) com sucesso!')
						.ok('OK')
						.targetEvent(ev)
					).then(function(result) {
						$window.location.reload();
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

		$scope.remove = function() {
			let ids = $scope.idAprovados;
			adminAPI.putUnsetAprovados(ids)
			.success(function(data, status) {
				$scope.selectedo = false;
				let showAlert = function(ev) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.textContent('Projeto(s) atualizado(s) com sucesso!')
						.ok('OK')
						.targetEvent(ev)
					).then(function(result) {
						$window.location.reload();
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

		$scope.ordenacao = ['categoria','eixo'];
		$scope.ordenarPor = function(campo) {
			$scope.ordenacao = campo;
		}

		$scope.query = 'nomeProjeto';
		$scope.setBusca = function(campo) {
			$scope.query = campo;
		}
		carregarProjetos();

	});
})();
