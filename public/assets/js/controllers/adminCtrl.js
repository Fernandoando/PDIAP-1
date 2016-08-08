(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('adminCtrl', function($scope, $rootScope, $location, $mdSidenav, $mdToast, projetosAPI) {

		$scope.projeto = {};
		$scope.projeto1 = {};
		$scope.projeto2 = {};
		// $scope.projeto3 = {};
		// $scope.projeto4 = {};
		$scope.projeto5 = {};
		$scope.conta = {};
		$scope.projetoEmail = '';
		$scope.integrantes = [];
		$rootScope.header = 'Dashboard';

		let maskCEP = function() {
			$scope.projeto2.cep = $scope.projeto2.cep.substring(0,2) + "." + $scope.projeto2.cep.substring(2);
			$scope.projeto2.cep = $scope.projeto2.cep.substring(0,6) + "-" + $scope.projeto2.cep.substring(6);
		};

		let carregarProjeto = function() {
			projetosAPI.getProjeto()
			.success(function(projeto) {
				$scope.nomeDoProjeto = projeto.nomeProjeto;
				$scope.projeto = projeto;
				$scope.projeto1.nomeProjeto = projeto.nomeProjeto;
				$scope.projeto1.categoria = projeto.categoria;
				$scope.projeto1.eixo = projeto.eixo;
				$scope.projeto1.resumo = projeto.resumo;

				$scope.projeto2.nomeEscola = projeto.nomeEscola;
				$scope.projeto2.estado = projeto.estado;
				$scope.projeto2.cidade = projeto.cidade;
				$scope.projeto2.cep = projeto.cep;
				maskCEP();

				$scope.conta.email = projeto.email;
				$scope.conta.username = projeto.username;
				$scope.projetoEmail = projeto.email;

				$scope.projeto5.hospedagem = [];
				if (projeto.hospedagem !== undefined) {
					$scope.projeto5.hospedagem = projeto.hospedagem.split(",");
					// console.log($scope.projeto5.hospedagem);
					$scope.hospedagemVerify = 'Sim';
				} else {
					$scope.hospedagemVerify = 'Não';
				}

				if (projeto.eixo === 'Ciências da Computação') {
					$scope.badget = 'responsive';
				} else if (projeto.eixo === 'Engenharias') {
					$scope.badget = 'rocket';
				} else if (projeto.eixo === 'Línguas e Artes') {
					$scope.badget = 'library';
				} else if (projeto.eixo === 'Ciências Agrárias, Exatas e da Terra') {
					$scope.badget = 'chart-areaspline';
				} else if (projeto.eixo === 'Ciências Ambientais, Biológicas e da Saúde') {
					$scope.badget = 'leaf';
				} else if (projeto.eixo === 'Ciências Humanas e Sociais Aplicadas') {
					$scope.badget = 'account-multiple';
				} else if (projeto.eixo === 'Extensão') {
					$scope.badget = 'projector-screen';
				} else if (projeto.eixo === 'Ciências da Natureza e suas tecnologias') {
					$scope.badget = 'leaf';
				} else if (projeto.eixo === 'Ciências Humanas e suas tecnologias') {
					$scope.badget = 'library';
				} else if (projeto.eixo === 'Linguagens, Códigos e suas tecnologias') {
					$scope.badget = 'code-tags';
				} else if (projeto.eixo === 'Matemática e suas tecnologias') {
					$scope.badget = 'chart-bar';
				}
				// for (var i in projeto.integrantes){
				// 	$scope.integrantes.push(projeto.integrantes[i]);
				// }
				// console.log($scope.integrantes);
			});
		};
		$scope.carregarProjeto = carregarProjeto;

		$scope.toggleSidenav = function(menu) {
			$mdSidenav(menu).toggle();
		};
		$scope.toast = function(message,tema) {
			var toast = $mdToast.simple().textContent(message).action('✖').position('top right').theme(tema).hideDelay(10000);
			$mdToast.show(toast);
		};

		$scope.data = {
			sidenav: {
				sections: [{
					name: 'Dashboard',
					expand: false,
					actions: [{
						name: 'Dashboard',
						icon: 'view-dashboard',
						link: 'home'
					}, {
						name: 'Alterar projeto',
						icon: 'flask',
						link: 'home.update'
					}, {
						name: 'Dados da conta',
						icon: 'account-settings-variant',
						link: 'home.conta'
					}]
				},{
					name: 'Avaliação',
					expand: false,
					actions: [{
						name: 'Ensino Fundamental',
						icon: 'lead-pencil',
						link: 'home.avaliacao-fundamental'
					}, {
						name: 'Ensino Médio',
						icon: 'pen',
						link: 'home.avaliacao-medio'
					}]
				}]
			}
		};
	});
})();
