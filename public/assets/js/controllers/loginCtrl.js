(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('loginCtrl', function($scope, $rootScope, $location, $mdDialog, projetosAPI) {

		$scope.login = function() {
			const email = $scope.user.email;
			const password = $scope.user.password;

			projetosAPI.postLogin(email,password)
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

		let enviarEmail = function(email) {
			projetosAPI.postEmail(email)
			.success(function(data) {
				console.log('EMAIL ENVIADO');
			})
			.error(function() {
				console.log('EMAIL NÃO FOI ENVIADO AF TIO');
			});
		};

		$scope.showPrompt = function(ev) {
			var confirm = $mdDialog.prompt()
			.title('RECUPERAR SENHA')
			.placeholder('E-mail')
			.ariaLabel('E-mail')
			.targetEvent(ev)
			.ok('Enviar >')
			.cancel('Fechar');
			$mdDialog.show(confirm).then(function(result) {
				console.log(result);
				enviarEmail(result);
			}, function() {
				console.log('fechou');
			});
		};
	});
})();
