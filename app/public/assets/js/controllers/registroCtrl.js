(function(){
	'use strict';

	angular
		.module('PDIAP')
		.controller('registroCtrl', function($scope, $location, projetosAPI) {

			// $scope.selectCategoria = {};

			$scope.registro = false;
			$scope.msg = 'msg';
			$scope.loginHabilitado = false;
			$scope.emailDuplicado = false;
			$scope.eixos = [];
			$scope.cidades = [];
			$scope.emails = [];

		  	$scope.registrar = function(projeto){
			   	
			   	projetosAPI.saveProjeto(projeto)
			   	.success(function(projeto, status) {     	
			    	console.log(projeto);
			    	if (status === 202) {
			    		$scope.emailDuplicado = true;
			    		$scope.projetoForm.email.$setValidity('duplicado',false);
		    			console.log('email duplicado: '+$scope.emailDuplicado);
			    	} else if (projeto !== 'error') {
			    		$scope.registro = true;
				    	$scope.msg = 'Registrado com sucesso!';
	           			//$location.url('/inscricao');
	           			resetForm();							
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
			   	console.log(projeto);
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
			};

			$scope.selectCidades = function(cid) {
				angular.forEach($scope.listaEstados, function (value, key) {
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
			};

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
	        };
	        $scope.addAluno = function() {
	        	$scope.count2++;
	            $scope.dynamicFields2.push(
	            	{nome:'nomeAluno'+$scope.count2, email:'emailAluno'+$scope.count2, cpf:'cpfAluno'+$scope.count2, telefone:'telefoneAluno'+$scope.count2, camiseta:'tamCamisetaAluno'+$scope.count2}
	            );
	        	if ($scope.count2 === 3) {
	        		$scope.btnAdd2 = false;
	        	}
	        };
	        
	        $scope.removeOrientador = function(index) {
	        	$scope.dynamicFields1.splice(index, 1);
	        	$scope.count1--;
	        	if ($scope.count1 !== 2) {
	        		$scope.btnAdd1 = true;
	        	}
        	};
        	$scope.removeAluno = function(index) {
	        	$scope.dynamicFields2.splice(index, 1);
	        	$scope.count2--;
	        	if ($scope.count2 !== 3) {
	        		$scope.btnAdd2 = true;
	        	}
        	};

			projetosAPI.getEmails()
			.success(function(data) {
				angular.forEach(data, function (value) {
					$scope.emails.push(value.email);
				});
				console.log($scope.emails);
			});

			$scope.verificaEmail = function(email) {
		    	for (var i in $scope.emails) {
		        	if ($scope.emails[i] == email) {
		            	$scope.projetoForm.email.$setValidity('duplicado',false);
		            	break; // importante parar caso email seja igual, senão não funciona
		        	} else {
		            	$scope.projetoForm.email.$setValidity('duplicado',true);
		        	}
		    	}
		    };

		    let resetForm = function() {
		    	delete $scope.projeto;
				$scope.projetoForm.$setPristine();
		   	 	$scope.btnAdd1 = true;
				$scope.btnAdd2 = true;
				$scope.count1 = 1;
				$scope.count2 = 1;
				$scope.dynamicFields1 = [
					{nome:'nomeOrientador1', email:'emailOrientador1', cpf:'cpfOrientador1', telefone:'telefoneOrientador1', camiseta:'tamCamisetaOrientador1'}
				];
				$scope.dynamicFields2 = [
					{nome:'nomeAluno1', email:'emailAluno1', cpf:'cpfAluno1', telefone:'telefoneAluno1', camiseta:'tamCamisetaAluno1'}
				];
				$scope.eixos = [];
				$scope.cidades = [];
				$scope.loginHabilitado = false;
				$scope.emailDuplicado = false;
		    }; 
		
		});
})();