(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('adminCtrl', function($scope, $rootScope, $location, $mdSidenav, $mdToast, projetosAPI) {

		$scope.projeto = {};
		$scope.projeto1 = {};
		$scope.projeto2 = {};
		$scope.projetoEmail = '';
		// $scope.projeto3 = {};
		// $scope.projeto4 = {};
		$scope.integrantes = [];
		$rootScope.header = 'Dashboard';

		projetosAPI.getProjeto()
		.success(function(projeto) {
			$scope.projeto = projeto;
			$scope.projeto1.nomeProjeto = projeto.nomeProjeto;
			$scope.projeto1.categoria = projeto.categoria;
			$scope.projeto1.eixo = projeto.eixo;
			$scope.projeto1.resumo = projeto.resumo;

			$scope.projeto2.nomeEscola = projeto.nomeEscola;
			$scope.projeto2.estado = projeto.estado;
			$scope.projeto2.cidade = projeto.cidade;
			$scope.projeto2.cep = projeto.cep;

			$scope.projetoEmail = projeto.email;

			console.log($scope.projeto1);
			console.log($scope.projeto2);
			// for (var i in projetos.integrantes){
			// 	$scope.integrantes.push(projetos.integrantes[i]);
			// }
			// console.log(projetos.integrantes);
		});

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
						link: 'Action 2'
					}]
				}, {
					name: 'Programação',
					expand: false,
					link: 'home.update'
				}, {
					name: 'Regulamentos',
					expand: false,
					link: 'home.update'
				}, {
					name: 'Modelos',
					expand: false,
					link: ''
				}]
			}
		};
	});
})();
