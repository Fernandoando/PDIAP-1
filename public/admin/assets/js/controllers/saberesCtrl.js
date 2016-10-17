(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('saberesCtrl', function($scope, $rootScope, $window, $location, $mdDialog, adminAPI) {

		$scope.escolas = [];
		$scope.saberesArray = [];

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

		adminAPI.getTodosSaberes()
		.success(function(saberes) {
			$scope.saberesArray = saberes;
		})
		.error(function(status) {
			console.log(status);
		});

		$scope.registrarSaberes = function(saberes) {
			console.log(saberes);
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
		};

		$scope.idPresentes = [];
		$scope.count = 0;
		$scope.contador = function(check,idSab) {
			if (check) {
				$scope.count--;
				let index = $scope.idPresentes.indexOf(idSab);
				$scope.idPresentes.splice(index, 1);
			}
			else {
				$scope.count++;
				$scope.idPresentes.push(idSab);
			}
			console.log($scope.idPresentes);
		}

		$scope.update = function() {
			let ids = $scope.idPresentes;
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
			let ids = $scope.idPresentes;
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

		$scope.ordenacao = ['nome','tipo'];
		$scope.ordenarPor = function(campo) {
			$scope.ordenacao = campo;
		}

		$scope.query = 'nome';
		$scope.setBusca = function(campo) {
			$scope.query = campo;
		}

		let resetForm = function() {
			delete $scope.saberes;
			$scope.saberesForm.$setPristine();
			$scope.saberesForm.$setUntouched();
		};
	});
})();
