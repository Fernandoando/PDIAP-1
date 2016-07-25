(function(){
	'use strict';

	angular
	.module('PDIAP')
	.config(function($stateProvider, $urlRouterProvider) {
		// For any unmatched url, redirect to /state1
		//$urlRouterProvider.otherwise("/state1");
		//
		// Now set up the states
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
		.state('home', {
			url: "/home",
			views: {
				'': {
					templateUrl: '/views/admin.html',
					controller: 'adminCtrl'
				},
				'@home': {templateUrl: '/views/home-admin.html'}
			}
		})
		.state('home.update', {
			url: "/update",
			templateUrl: "/views/update.html",
			controller: "updateCtrl"
		});
	});
})();
