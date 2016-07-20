(function(){
	'use strict';

	angular
		.module('PDIAP')
		.controller('registroCtrl', function($scope, $location, projetosAPI) {

			// $scope.selectCategoria = {};

			$scope.registro = false;
			$scope.msg = 'msg';
			$scope.loginHabilitado = false;
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

			$scope.habilitarLogin = function() {
				return $scope.loginHabilitado = true;
			};

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

			$scope.dynamicFields1 = [
				{nome:'nomeOrientador1', email:'emailOrientador1', cpf:'cpfOrientador1', telefone:'telefoneOrientador1', camiseta:'tamCamisetaOrientador1'}
			];
			$scope.dynamicFields2 = [
				{nome:'nomeAluno1', email:'emailAluno1', cpf:'cpfAluno1', telefone:'telefoneAluno1', camiseta:'tamCamisetaAluno1'}
			];

			$scope.btnAdd1 = true;
			$scope.btnAdd2 = true;
			$scope.count1 = 1;
			$scope.count2 = 1;
	        
	        $scope.addOrientador = function() {
	        	$scope.count1++;
	            $scope.dynamicFields1.push(
	            	{nome:'nomeOrientador'+$scope.count1, email:'emailOrientador'+$scope.count1, cpf:'cpfOrientador'+$scope.count1, telefone:'telefoneOrientador'+$scope.count1, camiseta:'tamCamisetaOrientador'+$scope.count1}
	            );
	        	if ($scope.count1 === 2) {
	        		$scope.btnAdd1 = false;
	        	}
	        }
	        $scope.addAluno = function() {
	        	$scope.count2++;
	            $scope.dynamicFields2.push(
	            	{nome:'nomeOrientador'+$scope.count2, email:'emailOrientador'+$scope.count2, cpf:'cpfOrientador'+$scope.count2, telefone:'telefoneOrientador'+$scope.count2, camiseta:'tamCamisetaOrientador'+$scope.count2}
	            );
	        	if ($scope.count2 === 3) {
	        		$scope.btnAdd2 = false;
	        	}
	        }
	        
	        $scope.removeOrientador = function(index) {
	        	$scope.dynamicFields1.splice(index, 1);
	        	$scope.count1--;
	        	if ($scope.count1 !== 2) {
	        		$scope.btnAdd = true;
	        	}
        	};
        	$scope.removeAluno = function(index) {
	        	$scope.dynamicFields2.splice(index, 1);
	        	$scope.count2--;
	        	if ($scope.count2 !== 3) {
	        		$scope.btnAdd2 = true;
	        	}
        	};
		
		});
})();