(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('adminSaberesCtrl', function($scope, $q, $mdSidenav, $mdToast, adminAPI) {

		$scope.saberes = [];
		// $scope.searchProject = "";

		let carregarSaberes = function() {
			adminAPI.getTodosSaberes()
			.success(function(saberes) {
				// angular.forEach(saberes, function (value, key) {
				// 	let obj = ({
				// 		_id: value._id.$oid,
				// 		numInscricao: value.numInscricao,
				// 		nomeProjeto: value.nomeProjeto,
				// 		nomeEscola: value.nomeEscola,
				// 		categoria: value.categoria,
				// 		eixo: value.eixo
				// 	});
				// 	$scope.projetos.push(obj);
				// });
				$scope.saberes = saberes;
				console.log(saberes);
			})
			.error(function(status) {
				console.log(status);
			});
		};
		$scope.carregarSaberes = carregarSaberes;

		$scope.textOrdenacao = [
			{text:'Nome'},
			{text:'Tipo'},
			{text:'Escola'}
		];

		$scope.ordenacao = 'nome';
		$scope.ordenarPor = function(campo) {
			$scope.ordenacao = campo;
		}

		$scope.query = 'nome';
		$scope.setBusca = function(campo) {
			$scope.query = campo;
		}
		carregarSaberes();

		// $scope.toggleSidenav = function(menu) {
		// 	$mdSidenav(menu).toggle();
		// };
		// $scope.toast = function(message,tema) {
		// 	var toast = $mdToast.simple().textContent(message).action('✖').position('top right').theme(tema).hideDelay(10000);
		// 	$mdToast.show(toast);
		// };

	});
})();
