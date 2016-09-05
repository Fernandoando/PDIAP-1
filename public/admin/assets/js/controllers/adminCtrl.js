(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('adminCtrl', function($scope, $q, $mdSidenav, $mdToast, adminAPI) {

		$scope.projetos = [];
		$scope.searchProject = "";
		$scope.idAprovados = [];

		let countTotal = 0;
		$scope.hosp = [];
		let carregarProjetos = function() {
			adminAPI.getTodosProjetos()
			.success(function(projetos) {
				angular.forEach(projetos, function (value, key) {
					let obj = ({
						_id: value._id.$oid,
						numInscricao: value.numInscricao,
						nomeProjeto: value.nomeProjeto,
						nomeEscola: value.nomeEscola,
						categoria: value.categoria,
						eixo: value.eixo
					});
					$scope.projetos.push(obj);
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
			adminAPI.putTodosProjetos(ids)
			.success(function(data, status) {
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

		// $scope.toggleSidenav = function(menu) {
		// 	$mdSidenav(menu).toggle();
		// };
		// $scope.toast = function(message,tema) {
		// 	var toast = $mdToast.simple().textContent(message).action('✖').position('top right').theme(tema).hideDelay(10000);
		// 	$mdToast.show(toast);
		// };

	});
})();
