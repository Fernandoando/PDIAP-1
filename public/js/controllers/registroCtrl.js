(function(){
	'use strict';

	angular
		.module('PDIAP')
		.controller('registroCtrl', function($scope, $location, projetosAPI) {

			// $scope.selectCategoria = {};

			$scope.registro = false;
			$scope.msg = 'msg';
			$scope.PasswordValid = false;
			$scope.EnvioValid = false;
			$scope.eixos = [];
			$scope.cidades = [];

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

			projetosAPI.getCategorias()
			.success(function(data) {
				$scope.listaCategorias = data.categorias;
			})
			.error(function(status) {
				console.log(status);
			});

			projetosAPI.getEstados()
			.success(function(data) {
				$scope.listaEstados = data.estados;
			})
			.error(function(status) {
				console.log(status);
			});

			$scope.selectEixos = function(cat) {
				angular.forEach($scope.listaCategorias, function (value, key){
			        //verifica a categoria selecionada
			        console.log(value.categoria);
			        if(cat === value.categoria){
			            console.log(value.eixos);
			            $scope.eixos = [];
			            //adiciona os eixos em $scope.eixos
			            for (var i in value.eixos) {
							$scope.eixos.push(value.eixos[i]);
					    }                 
			        }
			    });
			}

			$scope.selectCidades = function(cid) {
				angular.forEach($scope.listaEstados, function (value, key){
			        //verifica o estado selecionado
			        console.log(value.nome);
			        if(cid === value.nome){
			        	console.log(value.cidades);
			            $scope.cidades = [];
			            //adiciona as cidades em $scope.cidades
			            for (var x in value.cidades) {
							$scope.cidades.push(value.cidades[x]);
					    }                 
			        }
			    });
			}
		
		});
})();