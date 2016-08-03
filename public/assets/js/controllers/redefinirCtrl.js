(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('redefinirCtrl', function($scope, $rootScope, $location, $stateParams, projetosAPI) {

		$scope.username = 'projeto';
		$scope.username = $stateParams.username;

		$scope.enviarEmail = function() {
			projetosAPI.postEmail(email)
			.success(function(data) {
				console.log('EMAIL ENVIADO');
			})
			.error(function() {
				console.log('EMAIL NÃO FOI ENVIADO AF TIO');
			});
		};
	});
})();
