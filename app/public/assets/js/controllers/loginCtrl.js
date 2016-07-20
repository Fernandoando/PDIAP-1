(function(){
	'use strict';

	angular
		.module('PDIAP')
		.controller('loginCtrl', function($scope, $rootScope, $location, projetosAPI) {
		  	$scope.voce = "adasdasda";
		  	$scope.user = {};

		  	$scope.login = function(){
			  	const email = $scope.user.email;
			  	const password = $scope.user.password;
			  	
			  	projetosAPI.postLogin(email,password)
			   	.success(function(projeto) { // authentication OK
			    	$rootScope.logado = true;
			    	$rootScope.message = 'Sucesso';
			    	$scope.erro = false;
			    	console.log(projeto);
			    	$location.url('/home');
			   	})
			   	.error(function() { // authentication failed
			    	$rootScope.logado = false;
			    	$rootScope.message = 'Os dados informados estão incorretos.';
			    	$scope.erro = true;
			    	$location.url('/login');
			   	});
			};
		});
})();