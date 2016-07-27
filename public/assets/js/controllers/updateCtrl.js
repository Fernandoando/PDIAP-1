(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('updateCtrl', function($scope, $rootScope, $parse, $location, $mdToast, projetosAPI) {

		$rootScope.header = 'Alteração do projeto';
		$scope.alterado = false;
		$scope.orientadores = [];
		$scope.alunos = [];

		// alterar primeiro no array, ou criar novo array dps enviar esse array
		$scope.update = function(projeto) {
			//var dados = JSON.stringify({ integrantes: {nome: 'jailson' }});
			projetosAPI.putProjeto(projeto)
			.success(function(projeto){
				console.log(projeto);
				$scope.alterado = true;
				$scope.toast('Alteração feita com sucesso!','success-toast');
			})
			.error(function(status){
				console.log('update error: '+status);
				$scope.toast('Falha na alteração','failed-toast');
			});
		};

		$scope.updateIntegrante = function(projeto) {
			//var dados = JSON.stringify({ integrantes: {nome: 'jailson' }});
			console.log($scope.dynamicFields11.length);
			// projetosAPI.putIntegrante(projeto)
			// .success(function(projeto){
			// 	console.log(projeto);
			// 	$scope.alterado = true;
			// 	$scope.toast('Alteração feita com sucesso!','success-toast');
			// })
			// .error(function(status){
			// 	console.log('update error: '+status);
			// 	$scope.toast('Falha na alteração','failed-toast');
			// });
		};

		// let toast = function(message) {
		// 	var toast = $mdToast.simple().content(message).position('top right');
		// 	$mdToast.show(toast);
		// };


		projetosAPI.getProjeto()
		.success(function(data) {
			console.log(data);
			var x = 0;
			var y = 0;

			angular.forEach(data.integrantes, function (value, key){
				if (value.tipo === 'Orientador') {
					$scope.orientadores.push(value);
					console.log(value._id);
					x++;
					var str1 = 'projeto3.nomeOrientador'+x;
					var str2 = 'projeto3.emailOrientador'+x;
					var str3 = 'projeto3.cpfOrientador'+x;
					var str4 = 'projeto3.telefoneOrientador'+x;
					var str5 = 'projeto3.tamCamisetaOrientador'+x;
					var model1 = $parse(str1);
					var model2 = $parse(str2);
					var model3 = $parse(str3);
					var model4 = $parse(str4);
					var model5 = $parse(str5);

					value.cpf = value.cpf.substring(0,3) + "." + value.cpf.substring(3);
					value.cpf = value.cpf.substring(0,7) + "." + value.cpf.substring(7);
					value.cpf = value.cpf.substring(0,11) + "-" + value.cpf.substring(11);

					value.telefone = "(" + value.telefone.substring(0);
					value.telefone = value.telefone.substring(0,3) + ")" + value.telefone.substring(3);
					value.telefone = value.telefone.substring(0,4) + " " + value.telefone.substring(4);
					value.telefone = value.telefone.substring(0,9) + "-" + value.telefone.substring(9);

					model1.assign($scope, value.nome);
					model2.assign($scope, value.email);
					model3.assign($scope, value.cpf);
					model4.assign($scope, value.telefone);
					model5.assign($scope, value.tamCamiseta);
				} else if (value.tipo === 'Aluno') {
					$scope.alunos.push(value);
					y++;
					var str1 = 'projeto4.nomeAluno'+y;
					var str2 = 'projeto4.emailAluno'+y;
					var str3 = 'projeto4.cpfAluno'+y;
					var str4 = 'projeto4.telefoneAluno'+y;
					var str5 = 'projeto4.tamCamisetaAluno'+y;
					var model1 = $parse(str1);
					var model2 = $parse(str2);
					var model3 = $parse(str3);
					var model4 = $parse(str4);
					var model5 = $parse(str5);

					value.cpf = value.cpf.substring(0,3) + "." + value.cpf.substring(3);
					value.cpf = value.cpf.substring(0,7) + "." + value.cpf.substring(7);
					value.cpf = value.cpf.substring(0,11) + "-" + value.cpf.substring(11);

					value.telefone = "(" + value.telefone.substring(0);
					value.telefone = value.telefone.substring(0,3) + ")" + value.telefone.substring(3);
					value.telefone = value.telefone.substring(0,4) + " " + value.telefone.substring(4);
					value.telefone = value.telefone.substring(0,9) + "-" + value.telefone.substring(9);

					model1.assign($scope, value.nome);
					model2.assign($scope, value.email);
					model3.assign($scope, value.cpf);
					model4.assign($scope, value.telefone);
					model5.assign($scope, value.tamCamiseta);
				}
			});
			console.log($scope.alunos);
			console.log($scope.orientadores);
			for (var i = 0; i < $scope.orientadores.length; i++) {
				addOrientadorUpdate();
			}
			for (var i = 0; i < $scope.alunos.length; i++) {
				addAlunoUpdate();
			}
		});

		$scope.editing = false;
		$scope.edit = function() {
			$scope.editing = !$scope.editing;
		}

		$scope.dynamicFields11 = [];
		$scope.dynamicFields22 = [];
		$scope.btnAdd11 = true;
		$scope.btnAdd22 = true;
		$scope.count11 = 0;
		$scope.count22 = 0;

		let addOrientadorUpdate = function() {
			$scope.count11++;
			$scope.dynamicFields11.push(
				{nome:'nomeOrientador'+$scope.count11, email:'emailOrientador'+$scope.count11, cpf:'cpfOrientador'+$scope.count11, telefone:'telefoneOrientador'+$scope.count11, camiseta:'tamCamisetaOrientador'+$scope.count11}
			);
			if ($scope.count11 === 2) {
				$scope.btnAdd11 = false;
			}
		};
		$scope.addOrientadorUpdate = addOrientadorUpdate;


		let addAlunoUpdate = function() {
			$scope.count22++;
			$scope.dynamicFields22.push(
				{nome:'nomeAluno'+$scope.count22, email:'emailAluno'+$scope.count22, cpf:'cpfAluno'+$scope.count22, telefone:'telefoneAluno'+$scope.count22, camiseta:'tamCamisetaAluno'+$scope.count22}
			);
			if ($scope.count22 === 3) {
				$scope.btnAdd22 = false;
			}
		};
		$scope.addAlunoUpdate = addAlunoUpdate;

		$scope.removeOrientadorUpdate = function(index) {
			$scope.dynamicFields11.splice(index, 1);
			$scope.count11--;
			if ($scope.count11 !== 2) {
				$scope.btnAdd11 = true;
			}
		};
		$scope.removeAlunoUpdate = function(index) {
			$scope.dynamicFields22.splice(index, 1);
			$scope.count22--;
			if ($scope.count22 !== 3) {
				$scope.btnAdd22 = true;
			}
		};

		$scope.maskCEP = function() {
			$scope.projeto2.cep = $scope.projeto2.cep.substring(0,2) + "." + $scope.projeto2.cep.substring(2);
			$scope.projeto2.cep = $scope.projeto2.cep.substring(0,6) + "-" + $scope.projeto2.cep.substring(6);
		};
	});
})();
