(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('loginCtrl', function($scope, $rootScope, $location, $state, $stateParams, $mdDialog, projetosAPI) {

		$scope.login = function() {
			const username = $scope.user.username;
			const password = $scope.user.password;

			projetosAPI.postLogin(username,password)
			.success(function(projeto) { // authentication OK
				$rootScope.logado = true;
				$scope.message = 'Sucesso';
				$scope.erro = false;
				localStorage.setItem('token','TOKEN_TESTE');
				console.log("foiii");
				$mdDialog.hide();
				$location.url('/home');
			})
			.error(function() { // authentication failed
				$rootScope.logado = false;
				$scope.message = 'Os dados estão incorretos.';
				$scope.erro = true;
				console.log("deu merda");
			});
		};

		let enviarEmail = function(username) {
			projetosAPI.postRedefinir(username)
			.success(function(data) {
				$scope.email = data.email;
				$scope.token = data.token;
				// $scope.token = $stateParams.token;
				console.log($scope.token);
				console.log('EMAIL ENVIADO');
				let showAlert = function(ev) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.theme('alert')
						.title('Quase lá...')
						.textContent('Foi enviado um email para '+$scope.email+', onde seguem as instruções para a alteração da senha.')
						.ariaLabel('Alert Dialog Demo')
						.ok('OK')
						.targetEvent(ev)
					);
				};
				showAlert();
			})
			.error(function(status) {
				console.log('EMAIL NÃO FOI ENVIADO AF TIO');
				let showAlert = function(ev) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.theme('alert')
						.title('Deu ruim')
						.textContent('You can specify some description text in here.')
						.ariaLabel('Alert Dialog Demo')
						.ok('OK')
						.targetEvent(ev)
					);
				};
				showAlert();
			});
		};

		$scope.showPrompt = function(ev) {
			var confirm = $mdDialog.prompt()
			.title('RECUPERAR SENHA')
			.placeholder('Username')
			.ariaLabel('Username')
			.targetEvent(ev)
			.ok('Enviar >')
			.cancel('Fechar');
			$mdDialog.show(confirm).then(function(result) {
				// console.log(result);
				let username = ({
					username: result
				});
				enviarEmail(username);
				console.log(username);
			}, function() {
				console.log('fechou');
			});
		};
	});
})();
