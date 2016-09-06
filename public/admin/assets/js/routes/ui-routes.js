(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.config(function($locationProvider, $httpProvider, $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

		$locationProvider.html5Mode(true);
		$urlMatcherFactoryProvider.caseInsensitive(true);
		// $urlRouterProvider.otherwise("/404");

		let checkLoggedin = function($q, $rootScope, $http, $window) {

			var deferred = $q.defer(); // Inicializa nova promissa
			$rootScope.logado = false;

			$http.get('/admin/loggedin').success(function(projetos) {
				if (projetos !== '0') { // Authenticated
					$rootScope.logado = true;
					deferred.resolve();
				} else { // Not Authenticated
					$rootScope.logado = false;
					$window.location.href="http://movaci.com.br/admin";
					deferred.reject();
				}
			});
			return deferred.promise;
		};

		$stateProvider
		.state('admin', {
			url: "/admin",
			views: {
				'': {
					templateUrl: '/admin/views/login.html',
					controller: 'loginCtrl'
				}
			}
		})
		.state('home', {
			url: "/admin/home",
			views: {
				'': {
					templateUrl: '/admin/views/admin2.html',
					controller: 'admin2Ctrl'
				},
				'projetos@home': { templateUrl: '/admin/views/list-projetos.html' },
				'saberes@home': { templateUrl: '/admin/views/list-saberes.html' },
				'avaliadores@home': { templateUrl: '/admin/views/list-avaliadores.html' }
			},
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.state('master', {
			url: "/admin/master/home",
			templateUrl: 'admin/views/admin.html',
			controller: 'adminCtrl',
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.state('404', {
			url: "/404",
			templateUrl: 'admin/views/404.html'
		});
	});
})();
