(function(){
	'use strict';

	angular
		.module('PDIAP')
		.controller('registroCtrl', function($scope, $location, projetosAPI) {

			$scope.registro = false;
			$scope.msg = 'msg';
			$scope.PasswordValid = false;
			$scope.EnvioValid = false;

		  	$scope.registrar = function(projeto){
			   	
			   	projetosAPI.saveProjeto(projeto)
			   	.success(function(projeto) { 
	    	
			    	console.log(projeto);
			    	if (projeto !== 'error') {
			    		$scope.registro = true;
				    	$scope.msg = 'Registrado com sucesso!';
	           			//$location.url('/inscricao');
	           			delete $scope.projeto;
						$scope.inscricaoProjeto.$setPristine();	
			    	} else {
			    		$scope.registro = false;
			    		$scope.msg = 'Erro ao registrar projeto.';
			    		//$location.url('/inscricao');
			    	}	    	
			   	})
			   	.error(function(status) { 
			    	$scope.registro = false;
			    	$scope.msg = 'Erro ao registrar projeto.';
			    	console.log(status);
			    	//$location.url('/inscricao');
			   	});
			};

			$scope.validarSenha = function() {
				if ($scope.projeto.password == $scope.projeto.password2) {
					$scope.PasswordValid = true;
				} else {
					$scope.PasswordValid = false;
				}
				return $scope.PasswordValid;
			}
			
		});
})();