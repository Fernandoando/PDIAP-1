(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('adminCtrl', function($scope, $q, $mdSidenav, $mdToast, adminAPI) {

    $scope.projetos = [];
		$scope.searchProject = "";
		$scope.idAprovados = [];

		let carregarProjetos = function() {
			adminAPI.getTodosProjetos()
			.success(function(projetos) {
      	$scope.projetos = projetos;
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
