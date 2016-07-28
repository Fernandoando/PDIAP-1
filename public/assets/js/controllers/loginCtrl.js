(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('loginCtrl', function($scope, $rootScope, $location, $mdDialog, projetosAPI) {
		//$scope.user = {};

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
				$location.url('/home');
			})
			.error(function() { // authentication failed
				$rootScope.logado = false;
				$scope.message = 'Os dados informados estão incorretos.';
				$scope.erro = true;
				console.log("deu merda");
			});
		};

		$scope.showPrompt = function(ev) {
			var confirm = $mdDialog.prompt()
			.title('RECUPERAR SENHA')
			// .textContent('Bowser is a common name.')
			.placeholder('E-mail')
			.ariaLabel('E-mail')
			.targetEvent(ev)
			.ok('Enviar >')
			.cancel('Fechar');
			$mdDialog.show(confirm).then(function(result) {
				$scope.status = 'You decided to name your dog ' + result + '.';
				console.log(result);
			}, function() {
				console.log('fechou');
			});
		};
	});
	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}
})();
