(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('adminProjetosCtrl', function($scope, $q, $mdSidenav, $mdToast, adminAPI) {

		$scope.projetos = [];
		// $scope.searchProject = "";

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
			})
			.error(function(status) {
				console.log(status);
			});
		};
		$scope.carregarProjetos = carregarProjetos;

		// $scope.ordenacao = ['categoria','eixo'];
		// $scope.ordenarPor = function(campo) {
		// 	$scope.ordenacao = campo;
		// }
		//
		// $scope.query = 'nomeProjeto';
		// $scope.setBusca = function(campo) {
		// 	$scope.query = campo;
		// }
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
