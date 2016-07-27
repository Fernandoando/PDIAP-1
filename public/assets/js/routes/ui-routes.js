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
							$location.url('/login');
					}
			});
				return deferred.promise;
		};

		//$urlRouterProvider.otherwise("/state1");
		$stateProvider
		.state('index', {
			url: "/",
			views: {
				'': {templateUrl: '/views/index.html'}
			}
		})
		.state('login', {
			url: "/login",
			templateUrl: "/views/login.html",
			controller: "loginCtrl"
		})
		.state('inscricao', {
			url: "/inscricao",
			templateUrl: "/views/inscricao.html",
			controller: "registroCtrl"
		})
		.state('inscricao-saberes', {
			url: "/inscricao-saberes",
			templateUrl: "/views/saberes.html",
			controller: "registroCtrl"
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
		});
	});
})();
