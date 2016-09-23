(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('saberesCtrl', function($scope, $rootScope, $window, $location, $mdDialog, adminAPI) {

		$scope.escolas = [];

		adminAPI.getEscolasSaberes()
		.success(function(data) {
			angular.forEach(data, function (value) {
				if (value.escola !== undefined) {
					let escolaIdem = false;
					for (var i in $scope.escolas) {
						if (value.escola === $scope.escolas[i]) {
							escolaIdem = true;
							break;
						}
					}
					if (escolaIdem === false) {
						$scope.escolas.push(value.escola);
					}
				}
			});
		});

		$scope.registrarSaberes = function(saberes) {
			adminAPI.saveSaberesDocentes(saberes)
			.success(function(data) {
				if (data === 'success') {
					let showConfirmDialog = function(ev) {
						var confirm = $mdDialog.confirm()
						.title('Parabéns!')
						.textContent('Inscrição realizada com sucesso!')
						.ariaLabel('Inscrição realizada com sucesso!')
						.targetEvent(ev)
						.ok('OK');
						$mdDialog.show(confirm);
					};
					showConfirmDialog();
					resetForm();
				} else {
					let showConfirmDialog = function(ev) {
						var confirm = $mdDialog.confirm()
						.title('Ops...')
						.textContent('A inscrição não foi realizada. Tente novamente ou então, entre em contato conosco.')
						.ariaLabel('A inscrição não foi realizada.')
						.targetEvent(ev)
						.theme('error')
						.ok('Continuar')
						.cancel('Entrar em contato');
						$mdDialog.show(confirm).then(function() {}
						, function() {
							$window.location.href="http://movaci.com.br/contato";
						});
					};
					showConfirmDialog();
				}
			})
			.error(function(status) {
				let showConfirmDialog = function(ev) {
					var confirm = $mdDialog.confirm()
					.title('Ops...')
					.textContent('A inscrição não foi realizada. Tente novamente ou então, entre em contato conosco.')
					.ariaLabel('A inscrição não foi realizada.')
					.targetEvent(ev)
					.theme('error')
					.ok('Continuar')
					.cancel('Entrar em contato');
					$mdDialog.show(confirm).then(function() {}
					, function() {
						$window.location.href="http://movaci.com.br/contato";
					});
				};
				showConfirmDialog();
				console.log(status);
			});
			console.log(saberes);
		};

		let resetForm = function() {
			delete $scope.saberes;
			$scope.saberesForm.$setPristine();
			$scope.saberesForm.$setUntouched();
		};
	});
})();
