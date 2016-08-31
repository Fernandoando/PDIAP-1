(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.config(function($locationProvider, $httpProvider, $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

		$locationProvider.html5Mode(true);
		$urlMatcherFactoryProvider.caseInsensitive(true);
		// $urlRouterProvider.otherwise("/404");

		let checkLoggedin = function($q, $rootScope, $http, $state) {

			var deferred = $q.defer(); // Inicializa nova promissa
			$rootScope.logado = false;

			$http.get('/admin/home').success(function(projetos) {
				if (projetos !== '0') { // Authenticated
					$rootScope.logado = true;
					deferred.resolve();
				} else { // Not Authenticated
					$rootScope.logado = false;
					$state.go('admin');
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
