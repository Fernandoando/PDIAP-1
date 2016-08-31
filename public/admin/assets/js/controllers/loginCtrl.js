(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('loginCtrl', function($scope, $rootScope, $window, $state, $mdDialog, adminAPI) {

		$scope.login = function() {
			const username = $scope.user.username;
			const password = $scope.user.password;

			adminAPI.postLoginAdmin(username,password)
			.success(function(data) { // authentication OK
				$rootScope.logado = true;
				$scope.message = 'Sucesso';
				$scope.erro = false;
				$mdDialog.hide();
				// $state.go('home');
				$window.location.href="http://localhost/admin/home";
			})
			.error(function() { // authentication failed
				$rootScope.logado = false;
				$scope.message = 'Os dados estão incorretos.';
				$scope.erro = true;
			});
		};
	});
})();
