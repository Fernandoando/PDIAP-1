(function(){
	'use strict';

	angular
	.module('PDIAP')
	.config(function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

		let checkLoggedin = function($q, $http, $location, $rootScope) {

			var deferred = $q.defer(); // Inicializa nova promissa
			$rootScope.logado = false;

			$http.get('/projetos/home').success(function(projeto) {
				if (projeto !== '0') { // Authenticated
					$rootScope.logado = true;
					deferred.resolve();
				} else { // Not Authenticated
					$rootScope.logado = false;
					deferred.reject();
					$location.url('/');
				}
			});
			return deferred.promise;
		};

		$locationProvider.html5Mode(true);
		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false,
		// 	rewriteLinks: false
		// });
		// $urlRouterProvider.otherwise("/");
		$stateProvider
		.state('index', {
			url: "/",
			views: {
				'': {
					templateUrl: '/views/index.html',
					controller: "homeCtrl"
				}
			}
		})
		// .state('login', {
		// 	url: "/login",
		// 	templateUrl: "/views/login.html",
		// 	controller: "loginCtrl"
		// })
		.state('inscricao', {
			url: "/projetos/inscricao",
			templateUrl: "/views/inscricao.html",
			controller: "registroCtrl"
		})
		.state('saberes-docentes', {
			url: "/saberes-docentes/inscricao",
			templateUrl: "/views/saberes.html",
			controller: "saberesCtrl"
		})
		.state('avaliadores', {
			url: "/avaliadores/inscricao",
			templateUrl: "/views/avaliadores.html",
			controller: "avaliadoresCtrl"
		})
		.state('home', {
			url: "/home",
			views: {
				'': {
					templateUrl: '/views/admin.html',
					controller: 'adminCtrl'
				},
				'@home': {templateUrl: '/views/home-admin.html'}
			},
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.state('home.update', {
			url: "/update",
			templateUrl: "/views/update.html",
			controller: "updateCtrl"
		})
		.state('home.conta', {
			url: "/update-conta",
			templateUrl: "/views/conta.html",
			controller: "updateCtrl"
		})
		.state('nova-senha', {
			url: "/nova-senha/:username/:token",
			templateUrl: "/views/nova-senha.html",
			controller: "redefinirCtrl"
		});
	});
})();
