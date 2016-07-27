(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('registroCtrl', function($scope, $q, $location, projetosAPI) {

		$scope.registro = false;
		$scope.msg = 'msg';
		$scope.loginHabilitado = false;
		$scope.emailDuplicado = false;
		$scope.eixos = [];
		$scope.cidades = [];
		$scope.emails = [];
		$scope.escolas = [];

		$scope.registrar = function(projeto) {

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
				// console.log(value.categoria);
				if(cat === value.categoria){
					// console.log(value.eixos);
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
				// console.log(value.nome);
				if(cid === value.nome){
					// console.log(value.cidades);
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
			console.log($scope.dynamicFields2.length);
		};

		projetosAPI.getEmails()
		.success(function(data) {
			angular.forEach(data, function (value) {
				$scope.emails.push(value.email);
				if (value.nomeEscola !== undefined) {
					$scope.escolas.push(value.nomeEscola);
				}
			});
			console.log($scope.emails);
			console.log($scope.escolas);
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

		$scope.states = loadAll();
		$scope.simulateQuery = false;
		$scope.querySearch = querySearch;
		function querySearch (query) {
			var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
			deferred;
			if ($scope.simulateQuery) {
				deferred = $q.defer();
				$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
				return deferred.promise;
			} else {
				return results;
			}
		}

		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(states) {
				return (states.value.indexOf(lowercaseQuery) === 0);
			};
		}

		function loadAll() {
			var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
			Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
			Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
			Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
			North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
			South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
			Wisconsin, Wyoming';
			return allStates.split(/, +/g).map( function (state) {
				return {
					value: state.toLowerCase(),
					display: state
				};
			});
		}

		$scope.orientadoresArray = [];
		$scope.alunosArray = [];
$scope.animals = ["gato","cachorro"];
		$scope.montarIntegrantes = function(projeto) {
			$scope.orientadoresArray = [];
			$scope.alunosArray = [];
			for (var i = 1; i <= $scope.dynamicFields1.length; i++) {
				if (i === 1) {
					$scope.orientadoresArray.push(projeto.nomeOrientador1);
				}
				if (i === 2) {
					$scope.orientadoresArray.push(projeto.nomeOrientador2);
				}
			}
			for (var i = 1; i <= $scope.dynamicFields2.length; i++) {
				if (i === 1) {
					$scope.alunosArray.push(projeto.nomeAluno1);
				}
				if (i === 2) {
					$scope.alunosArray.push(projeto.nomeAluno2);
				}
				if (i === 3) {
					$scope.alunosArray.push(projeto.nomeAluno3);
				}
				console.log(projeto.nomeAluno2);
			}
			// if (projeto.nomeOrientador1 !== undefined) {
			// 	$scope.orientadoresArray.push(projeto.nomeOrientador1);
			// }
			// if (projeto.nomeOrientador2 !== undefined) {
			// 	$scope.orientadoresArray.push(projeto.nomeOrientador2);
			// }
			// if (projeto.nomeAluno1 !== undefined) {
			// 	$scope.alunosArray.push(projeto.nomeAluno1);
			// }
			// if (projeto.nomeAluno2 !== undefined) {
			// 	$scope.alunosArray.push(projeto.nomeAluno2);
			// }
			// if (projeto.nomeAluno3 !== undefined) {
			// 	$scope.alunosArray.push(projeto.nomeAluno3);
			// }
	};

		// var x1 = 0;
		// angular.forEach($scope.dynamicFields1, function (value, key) {
		// 	x1++;
		// 	var str = 'projeto.nomeOrientador'+x1;
		// 	var model = $parse(str);
		// 	model.assign($scope, value.nome);
		// });



		$scope.toppings = [
        { category: 'meat', name: 'Pepperoni' },
        { category: 'meat', name: 'Sausage' },
        { category: 'meat', name: 'Ground Beef' },
        { category: 'meat', name: 'Bacon' },
        { category: 'veg', name: 'Mushrooms' },
        { category: 'veg', name: 'Onion' },
        { category: 'veg', name: 'Green Pepper' },
        { category: 'veg', name: 'Green Olives' }
      ];

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
